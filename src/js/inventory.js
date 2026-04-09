const API = { list: 'api/get_items.php', add: 'api/add_item.php', update: 'api/update_item.php', delete: 'api/delete_item.php' };

async function loadItems() {
    const el = document.getElementById('itemList');
    el.innerHTML = '<p style="text-align:center;color:gray">Loading…</p>';
    try {
        const res = await fetch(API.list);
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        renderItems(data.items);
    } catch (err) {
        el.innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
    }
}

function renderItems(items) {
    const el = document.getElementById('itemList');
    if (items.length === 0) {
        el.innerHTML = '<p style="text-align:center;color:gray">No items yet.</p>';
        return;
    }
    el.innerHTML = items.map(item => `
        <div class="item-card" style="display:flex; justify-content:space-between; align-items:center">
            <div>
                <div style="font-weight:800">${item.name}</div>
                <div style="font-size:0.85rem; color:var(--text-muted)">
                    ₱${parseFloat(item.price).toFixed(2)} — 
                    <span class="${parseInt(item.stock) <= 5 ? 'low-stock' : ''}">Stock: ${item.stock}</span>
                </div>
            </div>
            <div style="display:flex; gap:8px">
                <button class="edit-btn" onclick="openEdit(${item.id}, '${item.name.replace(/'/g, "\\'")}', ${item.price}, ${item.stock})">Edit</button>
                <button class="del-btn" onclick="deleteItem(${item.id}, '${item.name.replace(/'/g, "\\' text-align:center")}')">Del</button>
            </div>
        </div>`).join('');
}

async function addItem() {
    const name = document.getElementById('newName').value.trim();
    const price = parseFloat(document.getElementById('newPrice').value);
    const stock = parseInt(document.getElementById('newStock').value);

    if (!name || isNaN(price) || isNaN(stock)) { showToast('⚠️ Check all fields'); return; }

    try {
        const res = await fetch(API.add, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        showToast('✅ Added!');
        ['newName', 'newPrice', 'newStock'].forEach(id => document.getElementById(id).value = '');
        loadItems();
    } catch (err) { showToast('❌ ' + err.message); }
}

function openEdit(id, name, price, stock) {
    document.getElementById('editId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editPrice').value = price;
    document.getElementById('editStock').value = stock;
    document.getElementById('editModal').classList.add('show');
}

function closeModal() { document.getElementById('editModal').classList.remove('show'); }

async function saveEdit() {
    const id = document.getElementById('editId').value;
    const name = document.getElementById('editName').value.trim();
    const price = parseFloat(document.getElementById('editPrice').value);
    const stock = parseInt(document.getElementById('editStock').value);

    try {
        const res = await fetch(API.update, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, name, price, stock })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        showToast('✅ Updated!');
        closeModal();
        loadItems();
    } catch (err) { showToast('❌ ' + err.message); }
}

async function deleteItem(id, name) {
    if (!confirm(`Delete ${name}?`)) return;
    try {
        const res = await fetch(API.delete, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        showToast('🗑️ Deleted');
        loadItems();
    } catch (err) { showToast('❌ ' + err.message); }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

loadItems();