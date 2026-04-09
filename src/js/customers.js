    const API = {
        customers: 'api/get_customers.php',
        pay:       'api/pay_utang.php'
    };

    async function loadCustomers() {
        const el = document.getElementById('customerList');
        el.innerHTML = '<p style="text-align:center;color:gray;padding:20px 0">Loading…</p>';
        try {
            const res  = await fetch(API.customers);
            const data = JSON.parse(await res.text());
            if (!data.success) throw new Error(data.error);
            renderCustomers(data.customers);
            updateTotalUnpaid(data.customers);
        } catch (err) {
            el.innerHTML = `<p style="text-align:center;color:red;padding:20px 0">❌ ${err.message}</p>`;
        }
    }

    function updateTotalUnpaid(customers) {
        let total = 0;
        customers.forEach(c => {
            c.utangs.forEach(u => {
                if (u.status === 'unpaid') total += parseFloat(u.amount);
            });
        });
        document.getElementById('totalUnpaid').innerText = total.toFixed(2);
    }

    function renderCustomers(customers) {
        const el = document.getElementById('customerList');
        if (customers.length === 0) {
            el.innerHTML = '<p style="text-align:center;color:gray;padding:20px 0">No customers yet.</p>';
            return;
        }
        el.innerHTML = customers.map(c => {
            const unpaidTotal = c.utangs
                .filter(u => u.status === 'unpaid')
                .reduce((sum, u) => sum + parseFloat(u.amount), 0);
            const allPaid = unpaidTotal === 0;

            const utangRows = c.utangs.map(u => {
                const remaining = parseFloat(u.amount) - parseFloat(u.paid_amount || 0);
                return `
                <div class="utang-item">
                    <div style="flex:1">
                        <div style="font-size:0.75rem; color:var(--text-muted)">${new Date(u.created_at).toLocaleDateString()}</div>
                        <div style="font-weight:800">₱${remaining.toFixed(2)} <small style="font-weight:400">(Total: ₱${u.amount})</small></div>
                    </div>
                    <div style="display:flex; align-items:center; gap:5px">
                        ${u.status === 'unpaid' ? `
                            <input type="number" id="pay-amt-${u.id}" placeholder="₱" style="width:60px; padding:5px; border-radius:8px; border:1px solid #ddd">
                            <button class="pay-btn" onclick="payPartial(${u.id})">Pay</button>
                        ` : '<span class="utang-status paid">PAID</span>'}
                    </div>
                </div>`;
            }).join('');

            return `
            <div class="customer-card">
                <div class="customer-top">
                    <div class="customer-name">👤 ${c.name}</div>
                    <div class="customer-total ${allPaid ? 'paid' : ''}">
                        ${allPaid ? '✅ All paid' : '₱' + unpaidTotal.toFixed(2)}
                    </div>
                </div>
                <div class="utang-list">${utangRows}</div>
            </div>`;
        }).join('');
    }

    async function payUtang(utangId) {
        if (!confirm('Mark this utang as paid?')) return;
        try {
            const res  = await fetch(API.pay, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: utangId })
            });
            const data = JSON.parse(await res.text());
            if (!data.success) throw new Error(data.error);
            showToast('✅ Marked as paid!');
            loadCustomers();
        } catch (err) { showToast('❌ ' + err.message); }
    }
    async function payPartial(id) {
    const amtInput = document.getElementById(`pay-amt-${id}`);
    const amount = parseFloat(amtInput.value);

    if (isNaN(amount) || amount <= 0) {
        showToast('⚠️ Enter a valid amount');
        return;
    }

    try {
        const res = await fetch('api/pay_utang.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, amount })
        });
        const data = await res.json();
        if (data.success) {
            showToast('✅ Payment recorded');
            loadCustomers();
        }
    } catch (err) {
        showToast('❌ Error processing payment');
    }
}

    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function showToast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    }

    loadCustomers();
