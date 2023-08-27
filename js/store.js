const shopItem = [
    {id :1, name: 'Album 1', src:'Images/Album 1.png', price : 12.99, count : 1},
    {id :2, name: 'Album 2', src:'Images/Album 2.png', price : 14.99, count : 1},
    {id :3, name: 'Album 3', src:'Images/Album 3.png', price : 20.00, count : 1},
    {id :4, name: 'Album 4', src:'Images/Album 4.png', price : 15.00, count : 1},
    {id :5, name: 'Coffee', src:'Images/Cofee.png', price : 5.00, count : 1}
];
const itemContainer = document.querySelector('.shop-items');
const cartContainer = document.querySelector('.cart-items');
const cartTotalPrice = document.querySelector('.cart-total-price');

let userBasket = [];
const RemoveAllProducts = document.querySelector('#RemoveAllProducts');


shopItem.forEach(function(Items){
    /*const shopItemContainer = document.createElement('div');
    shopItemContainer.className = 'shop-item';
    const newTitle = document.createElement('span');
    newTitle.className = 'shop-item-title';
    newTitle.innerHTML = Items.name;
    const newImg = document.createElement('img');
    newImg.setAttribute('src', Items.src);
    newImg.className = 'shop-item-image';
    const newDetailsContainer = document.createElement('div');
    newDetailsContainer.className = 'shop-item-details';
    const newPrice = document.createElement('span');
    newPrice.className = 'shop-item-price'
    newPrice.innerHTML = Items.price + '$';
    const newButton = document.createElement('button');
    newButton.className = 'btn btn-primary shop-item-button';
    newButton.innerHTML = 'ADD TO CART';
    newButton.setAttribute('type', 'button');


    newButton.addEventListener('click', function(){
        clickHandler(Items.id);
    })
    newDetailsContainer.append(newPrice, newButton);
    shopItemContainer.append(newTitle, newImg, newDetailsContainer);
    itemContainer.append(shopItemContainer);*/

    itemContainer.insertAdjacentHTML('beforeend', '<div class="shop-item"><span class="shop-item-title">' + Items.name + '</span><img class="shop-item-image" src="' + Items.src + '"><div class="shop-item-details"><span class="shop-item-price">' + Items.price + '$' + '</span><button class="btn btn-primary shop-item-button" onclick="clickHandler(' + Items.id + ')">ADD TO CART</button></div></div>')
});



function clickHandler(ProductId){
    let mainProduct = shopItem.find(function (product) {
        return product.id === ProductId;
    })

    userBasket.push(mainProduct);
    basketProductsGenerator(userBasket);
    totalCalculation(userBasket);
}

function basketProductsGenerator(userBasketArray){
    cartContainer.innerHTML = '';
    userBasket.forEach(function(Items){
        const newCartContainer = document.createElement('div');
        newCartContainer.className = 'cart-row';
        const newDiv = document.createElement('div');
        newDiv.className = 'cart-item cart-column';
        const newSecondDiv = document.createElement('div');
        newSecondDiv.className = 'cart-quantity cart-column';
        const newImg = document.createElement('img');
        newImg.className = 'cart-item-image';
        newImg.setAttribute('src', Items.src);
        newImg.setAttribute('width', '100px');
        newImg.setAttribute('height', '100px');
        const newSpan = document.createElement('span');
        newSpan.className = 'cart-item-title';
        newSpan.innerHTML = Items.name;
        const newSecondSpan = document.createElement('span');
        newSecondSpan.className = 'cart-price cart-column';
        newSecondSpan.innerHTML = Items.price + '$';
        const newInput = document.createElement('input');
        newInput.className = 'cart-quantity-input';
        newInput.setAttribute('type', 'number');
        newInput.value = Items.count;

        newInput.addEventListener('change', function(event){
                updateProductCount(Items.id, newInput.value)
        });
        
        const newButton = document.createElement('button');
        newButton.className = 'btn btn-danger';
        newButton.setAttribute('type', 'button');
        newButton.innerHTML = 'Remove';
        newButton.addEventListener('click', function(){
            removeProductFromBasket(Items.id)
        })
        newDiv.append(newImg, newSpan);
        newSecondDiv.append(newInput, newButton);
        newCartContainer.append(newDiv, newSecondSpan, newSecondDiv);
        cartContainer.append(newCartContainer);
        
    });
}    

RemoveAllProducts.addEventListener('click', function(){
    userBasket = [];
    basketProductsGenerator(userBasket);
    totalCalculation(userBasket);
})

function removeProductFromBasket (productId) {

    userBasket = userBasket.filter (function (product) {
        return product.id !== productId
    })

    basketProductsGenerator(userBasket)
    totalCalculation(userBasket);
}


function totalCalculation(userBasketArray){
    let totalPriceValue = 0
    userBasket.forEach(function(event){
        totalPriceValue += event.price * event.count;
    })

    cartTotalPrice.innerHTML = totalPriceValue + '$';
}

function updateProductCount (productId, newCount) {

    userBasket.forEach(function (product) {
        if (product.id === productId) {
            product.count = newCount
        }
    })
    totalCalculation(userBasket);
}