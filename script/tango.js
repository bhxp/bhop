function createItemElem(item) {
    return `<div class="item">
        <img src="/images/tango/${item.image}" class="item-img" />
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.price}</div>
        <button class="add-to-cart" onclick='addToCart("${item.name}")'>Add to Cart</button>
    </div>`;
}

function appendItemElem(html) {
    $("#store").append(html);
}

const appendItem = (item) => appendItemElem(createItemElem(item));

var items = [];

$(document).ready(() => {
    fetch("/tango_store.json")
    .then(response => response.json())
    .then(data => {
        items = data;
        console.log(data);
        data.forEach(item => {
            appendItem(item);
        });
    });
});
