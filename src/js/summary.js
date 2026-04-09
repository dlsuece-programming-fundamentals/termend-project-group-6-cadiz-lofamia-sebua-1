let allTransactions = [];
let currentFilter = 'all';

async function loadSummary() {
    try {
        const res = await fetch('./api/get_summary.php');
        const data = await res.json();
        if (!data.success) throw new Error(data.error);
        allTransactions = data.transactions;
        calculateTodayStats();
        renderTransactions();
    } catch (err) {
        document.getElementById('txList').innerHTML = `<p>Error: ${err.message}</p>`;
    }
}

function calculateTodayStats() {
    const today = new Date().toDateString();
    const todayTx = allTransactions.filter(t => new Date(t.created_at).toDateString() === today);
    
    const cash = todayTx.filter(t => t.type === 'cash').reduce((s, t) => s + parseFloat(t.total_amount), 0);
    const utang = todayTx.filter(t => t.type === 'utang').reduce((s, t) => s + parseFloat(t.total_amount), 0);

    document.getElementById('todayTotal').innerText = (cash + utang).toFixed(2);
    document.getElementById('todayCount').innerText = todayTx.length;
    document.getElementById('cashTotal').innerText = cash.toFixed(2);
    document.getElementById('utangTotal').innerText = utang.toFixed(2);
}

function setFilter(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTransactions();
}

function renderTransactions() {
    const el = document.getElementById('txList');
    const filtered = currentFilter === 'all' ? allTransactions : allTransactions.filter(t => t.type === currentFilter);
    
    el.innerHTML = filtered.map(t => `
        <div class="tx-card" style="display:flex; justify-content:space-between; align-items:center">
            <div>
                <span class="tx-type ${t.type}">${t.type.toUpperCase()}</span>
                <div style="font-weight:700">${t.customer_name ? '👤 ' + t.customer_name : 'Cash Sale'}</div>
                <small style="color:gray">${new Date(t.created_at).toLocaleString()}</small>
            </div>
            <div style="font-weight:900">₱${parseFloat(t.total_amount).toFixed(2)}</div>
        </div>`).join('');
}

loadSummary();