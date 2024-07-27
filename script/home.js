const navbar = $("#navbar");

var navbarItems = null;

$(document).on("mousedown", e => {
    $("div.dropdown").css("display", "none");
});

function openDropdown(index) {
    let dropdowns = $("#navbar .dropdown");
    dropdowns.hide();  // Hide all dropdowns
    $(dropdowns[index]).css("display", "block");  // Show the clicked dropdown
}

$(document).ready((e) => {
    fetch("/config/home_navbar.json")
        .then(response => response.json())
        .then(items => {
            let navbar = $("#navbar");
            items.forEach((item, index) => {
                if (item.multiple) {
                    let element = $("<div class='navbar-item'></div>");
                    element.text(item.text);
                    element.on("click", () => openDropdown(index));
                    let dropdown = $("<div class='dropdown'></div>");
                    item.pages.forEach(page => {
                        let elem = $("<div class='dropdown-item'></div>");
                        elem.text(page.page);
                        elem.on("click", () => window.open(page.url));
                        dropdown.append(elem);
                    });
                    element.append(dropdown);
                    navbar.append(element);
                } else {
                    let element = $("<div class='navbar-item'></div>");
                    element.text(item.text);
                    element.on("click", () => window.open(item.url));
                    navbar.append(element);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
});