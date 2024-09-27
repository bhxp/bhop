const navbar = $("#navbar");
var navbarItems = null;
var cancelNavbarHide = true;
var hideTimeout = null; // track the hide timeout

$(document).on("mousedown", e => {
    if (hideTimeout) {
        clearTimeout(hideTimeout);  // Clear any existing hide timeout
    }

    hideTimeout = setTimeout(() => {
        console.log("dropdown hidden");
        if (!cancelNavbarHide) {
            $("#navbar div.dropdown").addClass("hidden");
        }
    }, 50);
});

function openDropdown(index) {
    cancelNavbarHide = true;

    // Clear the hide timeout if the dropdown is opened
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }

    console.log(navbar.find("div.dropdown"));
    $("#navbar .navbar-item").eq(index).children(".dropdown").removeClass("hidden");
    console.log($("#navbar .navbar-item").eq(index).children(".dropdown"))
    console.log("dropdown shown");

    // Reset cancelNavbarHide after a short delay to avoid conflict with hide logic
    setTimeout(() => {
        cancelNavbarHide = false;
    }, 100);  // Slightly longer than the hide delay to avoid conflicts
}

$(document).ready((e) => {
    fetch("/config/home_navbar.json")
        .then(response => response.json())
        .then(items => {
            navbarItems = items;
            items.forEach(item => {
                if (item.multiple) {
                    console.log("multiple items");
                    let element = $("<div class='navbar-item'></div>");
                    element.text(item.text);
                    element.attr("onclick", `openDropdown(${items.indexOf(item)})`);
                    let dropdown = $("<div class='dropdown hidden'></div>");
                    item.pages.forEach(page => {
                        let elem = $("<div>");
                        elem.addClass("navbar-item");
                        elem.text(page.text);
                        elem.attr("onclick", `window.open("${page.url}");`);
                        dropdown.append(elem);
                    });
                    element.append(dropdown);
                    navbar.append(element);
                } else {
                    let element = $("<div>");
                    element.addClass("navbar-item");
                    element.text(item.text);
                    element.attr("onclick", `window.open("${item.url}");`);
                    navbar.append(element);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
});
