const API = { customers: 'api/get_customers.php', pay: 'api/pay_utang.php' };

async function loadCustomers() {
    const el = document.getElementById('customerList');
    try {
        const res = await fetch(API.customers);
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        renderCustomers(data.customers);
        updateTotalUnpaid(data.customers);
    } catch (err) {
        el.innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
    }
}

function updateTotalUnpaid(customers) {
    let total = 0;
    customers.forEach(c => {
        c.utangs.forEach(u => { if (u.status === 'unpaid') total += parseFloat(u.amount); });
    });
    document.getElementById('totalUnpaid').innerText = total.toFixed(2);
}

function renderCustomers(customers) {
    const el = document.getElementById('customerList');
    if (customers.length === 0) { el.innerHTML = '<p>No customers found.</p>'; return; }

    el.innerHTML = customers.map(c => {
        const unpaid = c.utangs.filter(u => u.status === 'unpaid').reduce((s, u) => s + parseFloat(u.amount), 0);
        const utangRows = c.utangs.map(u => `
            <div style="display:flex; justify-content:space-between; background:#f0f0f0; padding:8px; border-radius:8px; margin-top:5px">
                <div>
                    <small>${new Date(u.created_at).toLocaleDateString()}</small><br>
                    <b>₱${parseFloat(u.amount).toFixed(2)}</b>
                </div>
                <div>
                    <span style="font-size:0.7rem; font-weight:800; color:${u.status === 'paid' ? 'green' : 'orange'}">${u.status.toUpperCase()}</span>
                    ${u.status === 'unpaid' ? `<button onclick="payUtang(${u.id})" style="margin-left:5px">Pay</button>` : ''}
                </div>
            </div>`).join('');

        return `
            <div class="customer-card">
                <div style="display:flex; justify-content:space-between; font-weight:900">
                    <span>👤 ${c.name}</span>
                    <span style="color:var(--orange)">₱${unpaid.toFixed(2)}</span>
                </div>
                ${utangRows}
            </div>`;
    }).join('');
}

async function payUtang(id) {
    if (!confirm('Mark as paid?')) return;
    try {
        const res = await fetch(API.pay, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        const data = await res.json();
        if (data.success) { showToast('✅ Paid!'); loadCustomers(); }
    } catch (err) { showToast('❌ Error'); }
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

loadCustomers();