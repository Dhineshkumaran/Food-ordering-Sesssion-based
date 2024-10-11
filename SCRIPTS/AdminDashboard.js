window.onload = async () => {
    try {
        const response = await fetch('/getorder');
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        let result = await response.json();
        result = result;
        let replaceHtml = '';
        result.forEach((order, index) => {
            if (index % 3 === 0) {
                replaceHtml += '<div class="row justify-content-center">';
            }
            replaceHtml += `
                <div class="col-md-6 col-lg-4">
                    <div class="card mt-5">
                        <h3>Order${order.orderNo}</h3>
                        <button type="button" class="btn btn-success mark-paid" data-id="${order.orderNo}">Mark as paid</button>
                        <button type="button" class="btn btn-warning view-details mt-3" data-id="${order.orderNo}" style="color: white;">View details</button>
                    </div>
                </div>`;
            if ((index + 1) % 3 === 0 || index === result.length - 1) {
                replaceHtml += '</div>';
            }
        });
        document.getElementById('orders-container').innerHTML = replaceHtml;

        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', async ()=>{
                let id = btn.getAttribute('data-id');
                console.log(id);
                const response = await fetch(`/getorder?id=${id}`);
                if(!response.ok) {
                    throw new Error('Failed to fetch order');
                }
                let data = await response.json();
                data = data[0];
                console.log('Order:', data);
                let details = document.querySelector('.details');
                details.style.visibility='visible';
                details.style.marginBottom="50px";
                details.style.paddingLeft="20px";
                details.style.paddingRight="20px";
                details.innerHTML="";
                let foods=data.foodItems;
                let total_cost=0;
                let order_status = document.createElement('div');
                order_status.style.justifyContent = "space-between";
                order_status.style.display = "flex";
                let orderIdText = document.createTextNode(`OrderId:${data.orderNo}`);
                orderStatusText = document.createTextNode(`OrderStatus:${data.status}`);
                let orderId = document.createElement('h5');
                let orderStatus = document.createElement('h5');
                orderId.appendChild(orderIdText);
                orderStatus.appendChild(orderStatusText);
                order_status.appendChild(orderId);
                order_status.appendChild(orderStatus);
                details.appendChild(order_status);
                foods.forEach(El=>{
                    total_cost+=El.price * El.quantity;
                    let div1 = document.createElement('div');
                    div1.classList.add('chips', 'mt-2', 'mb-2');
                    let img = document.createElement('img');
                    img.src=El.imageURL;
                    img.style.width="50px";
                    img.style.height="50px";
                    let h5 = document.createElement('h5');
                    h5.innerText=`${El.name}`;
                    let div2 = document.createElement('div');
                    div2.style.display="flex";
                    let div3 = document.createElement('div');
                    let header5 = document.createElement('h5');
                    header5.appendChild(document.createTextNode(`Price: ${El.price}`));
                    let input = document.createElement('input');
                    input.type="number";
                    input.classList.add('quantity-input');
                    input.value=El.quantity;
                    input.disabled=true;
                    input.min=1;
                    input.setAttribute('id','input');
                    div1.appendChild(img);
                    div1.appendChild(h5);
                    div1.appendChild(header5);
                    div3.appendChild(input);
                    div3.setAttribute('id','div3');
                    div2.appendChild(div3);
                    div1.appendChild(div2);
                    details.appendChild(div1);
                });
                let div4 = document.createElement('div');
                div4.classList.add('text-center');
                let head5 = document.createElement('h5');
                head5.innerText=`Total price : ${total_cost}`;
                div4.appendChild(head5);
                details.appendChild(div4);
            });
        });

        document.querySelectorAll('.mark-paid').forEach(btn => {
            btn.addEventListener('click', async () => {
                btn.innerText = "Paid";
                btn.disabled = true;
                const id = btn.getAttribute('data-id');
                const response = await fetch(`/updateorder?id=${id}`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to update order status');
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}