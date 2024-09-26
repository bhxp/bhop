const navbar = $("#navbar");

var navbarItems = null;

var cancelNavbarHide = true;

$(document).on("mousedown", e => {
    setTimeout(() => {
        if (!cancelNavbarHide) {
            $("#navbar div.dropdown").addClass("hidden");
        } else {
            cancelNavbarHide = false;
        }
    }, 10);
});

function openDropdown(index) {
    cancelNavbarHide = true;
    console.log(navbar.find("div.dropdown"))
    $("#navbar div.dropdown")[index].classList.remove("hidden")
}

$(document).ready ((e) => {
    fetch ("/config/home_navbar.json")
        .then (response => response.json())
        .then (items => {
            navbarItems = items;
            items.forEach (item => {
                if (item.multiple) {
                    console.log("multiple items")
                    let element = $ ("<div class='navbar-item'></div>");
                    element.text (item.text)
                    element.attr ("onclick", `openDropdown(${items.indexOf(item)})`);
                    let dropdown = $("<div class='dropdown'></div>")
                    item.pages.forEach(page => {
                        let elem = $ ("<div>");
                    elem.addClass ("navbar-item");
                    elem.text (page.text)
                    elem.attr ("onclick", `window.open ("${page.url}");`);
                    dropdown.append (elem);
                    })
                    element.append(dropdown);
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