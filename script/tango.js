function createItemElem(item) {
    return
    `<div class="item">
        <img src="/images/tango/tango_.png" />
        <div id="item-name"></div>
        <div id="item-price"></div>
    </div>`;
}

function appendItemElem(html) {
    $("#store").append(html);
}

const appendItem = (item) => appendItemElem(createItemElem(item));

var items = [];

$(document).ready(e => {
    fetch("/tango_store.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(item => appendItem);
    });
});