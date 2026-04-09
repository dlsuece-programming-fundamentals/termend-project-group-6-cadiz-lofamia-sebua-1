const API = { items: 'api/get_items.php', sale: 'api/process_sale.php' };
let inventory = [], cart = {}, currentMode = 'cash';

async function loadItems() {
    const listEl = document.getElementById('itemList');
    listEl.innerHTML = '<p style="text-align:center;color:gray;padding:20px 0">Loading items…</p>';
    try {
        const res = await fetch(API.items);
        const data = await res.json();
        if (data.success) {
            inventory = data.items;
            renderInventory();
        } else {
            throw new Error(data.error || 'Could not load items');
        }
    } catch (err) {
        listEl.innerHTML = `<p style="text-align:center;color:red;padding:20px 0;font-size:0.85rem">❌ ${err.message}</p>`;
    }
}

function renderInventory() {
    const el = document.getElementById('itemList');
    if (inventory.length === 0) {
        el.innerHTML = '<p style="text-align:center;color:gray;padding:20px 0">No items in stock. Add items via Inventory.</p>';
        return;
    }
    el.innerHTML = inventory.map(item => {
        const qty = cart[item.id] || 0;
        const outOfStock = parseInt(item.stock) <= 0;
        return `
        <div class="item-card${outOfStock ? ' out-of-stock' : ''}">
            <div style="flex:1">
                <div style="font-weight:800; font-size:1rem;">${item.name}</div>
                <div style="font-size:0.85rem; color:var(--text-muted)">
                    ₱${parseFloat(item.price).toFixed(2)} &mdash; Stock: ${item.stock}
                </div>
            </div>
            ${qty > 0
                ? `<div style="display:flex; align-items:center; gap:8px;">
                        <button style="width:30px;height:30px;border-radius:50%;border:1px solid #ddd" onclick="changeQty(${item.id}, -1)">−</button>
                        <span style="font-weight:900; background:var(--active-blue); color:white; padding:4px 10px; border-radius:10px">${qty}</span>
                        <button style="width:30px;height:30px;border-radius:50%;border:1px solid #ddd" onclick="changeQty(${item.id}, 1)">+</button>
                   </div>`
                : `<div style="color:var(--active-blue);font-weight:800;font-size:1.4rem;cursor:pointer;padding:0 8px;" onclick="changeQty(${item.id}, 1)">+</div>`
            }
        </div>`;
    }).join('');
}

function changeQty(id, delta) {
    const item = inventory.find(i => i.id == id);
    if (!item) return;
    const next = (cart[id] || 0) + delta;
    if (next < 0) return;
    if (next > parseInt(item.stock)) { showToast('⚠️ Not enough stock!'); return; }
    if (next === 0) delete cart[id];
    else cart[id] = next;
    refreshUI();
}

function refreshUI() {
    renderInventory();
    let total = 0;
    inventory.forEach(i => { if (cart[i.id]) total += parseFloat(i.price) * cart[i.id]; });
    document.getElementById('totalDisplay').innerText = total.toFixed(2);

    const btn = document.getElementById('completeBtn');
    const hasItems = total > 0;
    const customer = document.getElementById('customerName').value.trim();
    const ready = (currentMode === 'cash' && hasItems) || (currentMode === 'utang' && hasItems && customer.length > 0);
    btn.disabled = !ready;
    btn.classList.toggle('active-ready', ready);
}

function updateMode(mode) {
    currentMode = mode;
    document.getElementById('customerDiv').classList.toggle('visible', mode === 'utang');
    refreshUI();
}

async function processSale() {
    const btn = document.getElementById('completeBtn');
    const customer = document.getElementById('customerName').value.trim();
    const saleItems = Object.keys(cart).map(id => ({
        item_id: parseInt(id),
        quantity: cart[id],
        price: parseFloat(inventory.find(i => i.id == id).price)
    }));

    btn.innerText = 'Processing…';
    btn.disabled = true;

    try {
        const res = await fetch(API.sale, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: currentMode, customer_name: customer, items: saleItems })
        });
        const data = await res.json();
        if (data.success) {
            showToast('✅ Sale Recorded!');
            cart = {};
            document.getElementById('customerName').value = '';
            await loadItems();
            refreshUI();
        } else throw new Error(data.error);
    } catch (err) {
        showToast('❌ ' + err.message);
    } finally {
        btn.innerText = 'Complete Transaction';
    }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

loadItems();