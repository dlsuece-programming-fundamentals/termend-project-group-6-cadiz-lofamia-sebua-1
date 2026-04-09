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
    const filtered = currentFilter === 'all' 
        ? allTransactions 
        : allTransactions.filter(t => t.type === currentFilter);
    
    if (filtered.length === 0) {
        el.innerHTML = '<p style="text-align:center;color:gray;padding:20px 0">No transactions found.</p>';
        return;
    }

    el.innerHTML = filtered.map(t => {
        // Handle payment status badge
        let statusBadge = '';
        if (t.type === 'cash') {
            statusBadge = '<span class="status-tag paid">PAID</span>';
        } else {
            const isPaid = t.utang_status === 'paid';
            statusBadge = `<span class="status-tag ${isPaid ? 'paid' : 'unpaid'}">${isPaid ? 'PAID' : 'PENDING'}</span>`;
        }

        return `
        <div class="tx-card" style="display:flex; flex-direction:column; align-items:stretch;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                    <span class="tx-type ${t.type}">${t.type.toUpperCase()}</span>
                    ${statusBadge}
                    <div style="font-weight:800; font-size:1rem; margin-top:4px;">
                        ${t.customer_name ? '👤 ' + t.customer_name : '🛒 Cash Sale'}
                    </div>
                </div>
                <div style="font-weight:900; font-size:1.1rem;">
                    ₱${parseFloat(t.total_amount).toFixed(2)}
                </div>
            </div>
            
            <div style="font-size:0.85rem; color:#555; background:#f0f0f0; padding:8px; border-radius:10px; margin-bottom:8px;">
                <strong>Items:</strong> ${t.item_list || 'Items not recorded'}
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center;">
                <small style="color:var(--text-muted); font-weight:600;">
                    ${new Date(t.created_at).toLocaleString()}
                </small>
            </div>
        </div>`;
    }).join('');
}
loadSummary();