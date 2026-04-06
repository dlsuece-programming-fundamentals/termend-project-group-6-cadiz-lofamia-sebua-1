//get data or fresh start
let inventory=JSON.parse(localStorage.getItem('sari-inventory'))||[];

//update with latest items
function renderInventory(){
    const listContainer=document.getElementById('inventoryList');
    const emptyMsg=document.getElementById('emptyState');
    
    //no items
    if (inventory.length===0){
        listContainer.innerHTML='';
        emptyMsg.style.display='block';
        return;
    }

    //hide and build
    emptyMsg.style.display='none';
    let html='';

    inventory.forEach(item=>{
        html+=`
        <div class="card p-3 mb-2 inventory-card shadow-sm border-0 border-start border-primary border-4">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0 fw-bold">${item.name}</h6>
                    <small class="text-muted">Stock: ${item.stock} available</small>
                </div>
                <div class="text-end">
                    <div class="text-primary fw-bold">₱${item.price.toLocaleString()}</div>
                    <button class="btn btn-sm text-danger p-0" onclick="deleteItem(${item.id})">
                        Remove
                    </button>
                </div>
            </div>
        </div>`;
    });
    listContainer.innerHTML=html;
}

function openModal(){
    const myModal=new bootstrap.Modal(document.getElementById('itemModal'));
    myModal.show();
}

function addItem(){
    //get popup values
    const nameInput=document.getElementById('itemName').value;
    const priceInput=document.getElementById('itemPrice').value;
    const stockInput=document.getElementById('itemStock').value;

    //validation
    if (!nameInput||!priceInput||!stockInput){
        alert("Oops! Please fill out all the fields first.");
        return;
    }

    const newProduct={
        id:Date.now(), //unique id by time
        name:nameInput,
        price:parseFloat(priceInput),
        stock:parseInt(stockInput),
        created_at:new Date()
    };

    //save to list
    inventory.push(newProduct);
    localStorage.setItem('sari-inventory',JSON.stringify(inventory));
    
    // reset form
    document.getElementById('itemName').value ='';
    document.getElementById('itemPrice').value ='';
    document.getElementById('itemStock').value ='';
    
    // close modal
    const modalEl=document.getElementById('itemModal');
    const modalInstance=bootstrap.Modal.getInstance(modalEl);
    modalInstance.hide();

    renderInventory();
}

function deleteItem(id){
    if (confirm("Delete this item? This cannot be undone.")){
        inventory=inventory.filter(p=>p.id!==id);
        localStorage.setItem('sari-inventory',JSON.stringify(inventory));
        renderInventory();
    }
}

//start on content loaded
document.addEventListener('DOMContentLoaded', renderInventory);