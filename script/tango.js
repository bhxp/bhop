function createItemElem(item) {

    return
    `<div class="item">
        <img src="/images/tango/${item.image}" />
        <div class="item-name">${item.name}</div>
        <div class="item-price">${item.price}</div>
        <button class="add-to-cart" onclick="addToCart("${item.name}")">Add to Cart</button>
    </div>`;
}

function appendItemElem(html) {
    $("#store").html($("store").html() + html);
}

const appendItem = (item) => appendItemElem(createItemElem(item));

var items = [];

$(document).ready(e => {
    fetch("/tango_store.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        data.forEach(item => {
            appendItem(item);
        });
    });
});