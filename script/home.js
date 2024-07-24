const navbar = $("#navbar");

var navbarItems = null;

$(document).on("mousedown", e => {
    $("div.dropdown").css("display", "none");
});

function openDropdown(index) {
    navbar.find("div.dropdown")[index].css("display", "block");
}

$(document).ready ((e) => {
    fetch ("/config/home_navbar.json")
        .then (response => response.json())
        .then (items => {
            navbarItems = items;
            items.forEach (item => {
                if (item.multiple) {
                    let element = $ ("<div class='navbar-item'></div>");
                    element.text (item.text)
                    element.attr ("onclick", `openDropdown(${items.indexOf(item)})`);
                    let dropdown = $("<div class='dropdown' style='display: hidden;'></div>")
                    item.pages.forEach(page => {
                        let elem = $ ("<div class='dropdown-item'></div>");
                        element.text (page.page)
                        element.attr ("onclick", `window.open ("${page.url}");`);
                        dropdown.append (elem);
                    })
                    navbar.append (element);
                } else {
                    let element = $ ("<div>");
                    element.addClass ("navbar-item");
                    element.text (item.text)
                    element.attr ("onclick", `window.open ("${item.url}");`);
                    navbar.append (element);
                }
            });
        })
        .catch (error => {
            console.error (error);
        });
});