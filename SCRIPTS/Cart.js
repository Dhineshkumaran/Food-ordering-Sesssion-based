window.onload = async () => {
    let payorderbtn = document.getElementById('onpay');
    let orderbtn = document.getElementById('nopay');
    try {
    let cartItemsDiv = document.getElementById('food_container');
    const response = await fetch('/getcartitems');
    if (!response.ok) {
        throw new Error('Failed to fetch cart items');
    }
    const cartItems = await response.json();
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('chips', 'mt-2', 'mb-2');
        cartItemDiv.innerHTML = `
            <img src="${item.imageURL}" width="100px" height="100px">
            <h5>${item.name}</h5>
            <p style="padding-left:10px; padding-top:10px;">${item.price}</p>
            <div class="ml-auto" style="display: flex;">
                <i class="fa-solid fa-circle-minus pr-3" style="font-weight: bold; padding-top: 10px; cursor: pointer;"></i>
                <div><input type="number" class="quantity-input" value="${item.quantity}" min="1"></div>
                <i class="fa-solid fa-circle-plus  pl-3" style="font-weight: bold; padding-top: 10px; cursor: pointer;"></i>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
    });
} catch (error) {
    console.error('Error fetching cart items:', error);
}

// Function to handle successful payment
function handlePaymentSuccess(response) {
    alert('Payment successful: ' + response.razorpay_payment_id);
    sendOrderUpdateRequest();
}

// Function to send request to update order
async function sendOrderUpdateRequest() {
    let chips = document.querySelectorAll('.chips');
    let order = [];
    chips.forEach(div => {
        let imgSrc = div.querySelector('img').src;
        let foodName = div.querySelector('h5').innerText;
        let quantity = div.querySelector('input').value;
        let price = div.querySelector('p').innerText;
        let newFoodItem = {
            "name": `${foodName}`,
            "quantity": quantity,
            "imageURL": `${imgSrc}`,
            "price": `${parseInt(price)}`
        };
        order.push(newFoodItem);
    });
    try {
        const response = await fetch('/updateorder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });

        const result = await response.json();
        console.log(result);

        if (!response.ok) {
            throw new Error("Error adding orders to database!");
        } else {
            orderbtn.disabled = true;
            orderbtn.innerText = "Ordered";
        }

    } catch (error) {
        console.log('Error:', error);
    }
}

//Initiating payment
payorderbtn.addEventListener('click', async () => {
    try {
        let total_cost = 0;
        let chips = document.querySelectorAll('.chips');
        chips.forEach(div=>{
            total_cost+=parseInt(div.querySelector('p').innerText) * div.querySelector('input').value;
        })

        const response = await fetch('/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: total_cost * 100,
                currency: 'INR',
                receipt: 'receipt#1',
                payment_capture: 1
            })
        });
        if (!response.ok) {
            throw new Error('Failed to initiate payment');
        }

        const data = await response.json();
        const options = {
            key: 'rzp_test_4rdgre6savrrmw',
            amount: data.amount,
            currency: data.currency,
            order_id: data.id,
            name: 'NoServer',
            description: 'Purchase Description',
            image: 'https://lh3.googleusercontent.com/9-QYzVjyBYT8SJgSlY64SmIBsb3szJlB8fhPaR5rXIrI-lPcm_cgpW8ZgCEdY3HJMHlntaRQ9zxRzIR1Ibu_Sno=w1280',
            handler: handlePaymentSuccess,
            prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9999999999'
            },
            theme: {
            color: '#cd9225'
            }
        };

        const rzp = new Razorpay(options);
        rzp.open();
    } catch (error) {
        console.error('Error initiating payment:', error);
    }
});

let minus = document.querySelectorAll(".fa-circle-minus");
let plus = document.querySelectorAll(".fa-circle-plus");

minus.forEach(min => {
    min.addEventListener('click', () => {
        let input = min.parentNode.querySelector('.quantity-input');
        if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
        }
    });
});

plus.forEach(max => {
    max.addEventListener('click', () => {
        let input = max.parentNode.querySelector('.quantity-input');
        input.value = parseInt(input.value) + 1;
    });
});
}