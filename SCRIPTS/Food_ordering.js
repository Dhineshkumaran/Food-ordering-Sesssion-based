window.onload = () => {
    loadFoodItems();
};

async function loadFoodItems() {
  let dynamic = document.getElementById('dynamic');
  try {
    const response = await fetch('http://3.105.226.162:3000/getfooditems',{
      credentials: 'include'
    });
    const items = await response.json();
    let mainreplaceHtml = '';
    items.forEach((item, index) => {
      if (index % 4 === 0) {
        mainreplaceHtml += '<div class="row pt-3">';
      }

      mainreplaceHtml += `
      <div class="col-md-3 mb-4">
          <div class="card">
              <img class="card-img-top" src="${item.imageURL}" style="height: 180px;" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-price">Price: $${item.price}</p>
                  <div class="btn btn-dark">Add to cart</div>
              </div>
          </div>
      </div>`;

      if ((index + 1) % 4 === 0 || index === items.length - 1) {
        mainreplaceHtml += '</div>';
      }
    });
    dynamic.innerHTML = mainreplaceHtml;

    // Attach event listeners after adding the content
    attachEventListeners();
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('sign-out').addEventListener('click', ()=>{
  fetch('/logout').then((response) => {
    console.log(response);
    if(response.ok){
      window.location.href = "/";
    }
  })
  .catch((error)=>{
    console.log(error);
  })
})

function attachEventListeners() {
  let count = 0;
  let btns = document.querySelectorAll(".btn-dark");
  let span1 = document.getElementById("span1");
  let span2 = document.getElementById("span2");
  btns.forEach(btn => {
    btn.addEventListener("click", async function () {

      let parentEl = this.parentNode;
      count++;

      span1.innerText=count;
      span2.innerText=count;
      
      parentEl.removeChild(this);
      parentEl.innerHTML += '<div class="btn btn-dark disabled">Added to cart</div>';

      let itemname = parentEl.parentNode.getElementsByTagName('h5')[0].innerText;
      let itemURL = parentEl.parentNode.getElementsByTagName('img')[0].src;
      let itemprice = parentEl.parentNode.getElementsByTagName('p')[1].innerText;
      itemprice = parseFloat(itemprice.split("$")[1]);

      const itemsToAdd = {
        name: itemname,
        imageURL: itemURL,
        price: itemprice
      }

      try {
        const response = await fetch('http://3.105.226.162:3000/add-to-cart', {
          method: 'POST',
          credentials: 'include',
          headers: { 
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemsToAdd)
        });

        if (!response.ok) {
          throw new Error('Failed to add items to cart');
        }
        const data = await response.json();
        console.log('Cart:', data);
      }
      catch (error) {
        console.log('Error: ', error);
      }
    });
  });
}