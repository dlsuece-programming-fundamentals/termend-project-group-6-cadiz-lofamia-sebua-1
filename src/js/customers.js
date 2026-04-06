//load data or start fresh
let customerList = JSON.parse(localStorage.getItem('sari-customers')) || [];

function displayCustomers(){
    const listContainer=document.getElementById('customerList');
    const emptyMsg=document.getElementById('emptyState');
    const utangDisplay=document.getElementById('totalUtang');
    const countDisplay=document.getElementById('customerCount');

    if (customerList.length===0){
        listContainer.innerHTML='';
        emptyMsg.style.display='block';
        utangDisplay.innerText="0.00";
        countDisplay.innerText="0";
        return;
    }

    emptyMsg.style.display='none';
    
    let runningTotalDebt=0;
    let totalDebtors=0;
    let cardHtml='';

    customerList.forEach(person=>{
        //add to total astounding
        if (person.balance>0){
            runningTotalDebt+=person.balance;
            totalDebtors++;
        }

        cardHtml += `
        <div class="customer-card shadow-sm border-0 mb-3 p-3 bg-white rounded">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <div class="customer-name h6 mb-0 fw-bold">${person.name}</div>
                    <small class="text-muted">${person.phone || 'No phone number'}</small>
                </div>
                
                <div class="text-end">
                    //red if they owe, green if cleared
                    <div class="customer-debt ${person.balance > 0 ? 'text-danger' : 'text-success'} fw-bold h5 mb-0">
                        ₱${person.balance.toFixed(2)}
                    </div>
                    
                    //pay button
                    ${person.balance > 0 ? 
                        `<button class="btn btn-sm btn-outline-success mt-1 py-0 px-2" style="font-size: 0.75rem" 
                         onclick="payDebt(${person.id})">Mark Paid</button>` : 
                        `<span class="badge bg-light text-success border">Cleared</span>`
                    }
                </div>
            </div>
        </div>`;
    });

    listContainer.innerHTML = cardHtml;
    
    //update total astounding
    utangDisplay.innerText=runningTotalDebt.toLocaleString(undefined,{
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
    });
    
    countDisplay.innerText=totalDebtors;
}

//popup
function openModal(){
    const modalElement=document.getElementById('customerModal');
    const bootstrapModal=new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}

//save info
function addCustomer(){
    const nameField=document.getElementById('customerName');
    const phoneField=document.getElementById('customerPhone');

    const nameValue=nameField.value.trim();
    const phoneValue=phoneField ? phoneField.value.trim():'';

    if (!nameValue){
        alert("Please enter the customer's name.");
        return;
    }

    const newEntry={
        id:Date.now(), //unique time id
        name:nameValue,
        phone:phoneValue,
        balance:0 
    };

    //add to list
    customerList.push(newEntry);
    localStorage.setItem('sari-customers',JSON.stringify(customerList));
    
    //clear input
    nameField.value='';
    if(phoneField) phoneField.value='';
    
    //close modal
    const modalEl=document.getElementById('customerModal');
    const modalInstance=bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    displayCustomers();
}

function payDebt(customerId){
    //find person in list
    const customer=customerList.find(c=>c.id===customerId);
    
    if (!customer)return;

    //confirm to clear
    const confirmPayment = confirm(`Confirm full payment of ₱${customer.balance.toFixed(2)} from ${customer.name}?`);
    
    if (confirmPayment){
        //reset balance
        customer.balance=0;
        localStorage.setItem('sari-customers',JSON.stringify(customerList));
        displayCustomers();
    }
}

//run as soon as page loads
document.addEventListener('DOMContentLoaded', displayCustomers);