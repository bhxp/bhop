const navbar = $("#navbar");
var navbarItems = null;
var cancelNavbarHide = true;
var hideTimeout = null; // track the hide timeout
var dropdownIndexes = [];
var waves = [];
var canvas = $("#background-canvas").get(0);
var ctx = canvas.getContext("2d");

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
    const dropdown = $("#navbar .navbar-item-top").eq(index).children(".dropdown");
    cancelNavbarHide = true;
    dropdown.removeClass("hidden");

    // Clear the hide timeout if the dropdown is opened
    if (hideTimeout) {
        clearTimeout(hideTimeout);
    }

    console.log(navbar.find("div.dropdown"));
    console.log($("#navbar .navbar-item-top").eq(index).children(".dropdown"))
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
            let i = 0;
            items.forEach(item => {
                if (item.multiple) {
                    console.log("multiple items");
                    let element = $("<div class='navbar-item navbar-item-top'></div>");
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
                    dropdownIndexes.push(i);
                } else {
                    let element = $("<div>");
                    element.addClass("navbar-item navbar-item-top");
                    element.text(item.text);
                    element.attr("onclick", `window.open("${item.url}");`);
                    navbar.append(element);
                }
                i ++;
            });
        })
        .catch(error => {
            console.error(error);
        });
});

for (let i = 0; i < waveCount; i ++) {
    waves.push()
}

class Wave {
    constructor(x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
        this.x = x;
        this.y = y;
        this.amplitude = Math.random() * 360;
        this.frequency = Math.random() * 540 + 120;
        this.curPhase = 0;
        this.weight = 0;
    }

    update() {
        this.curPhase += 1;
        if (this.curPhase > this.frequency * 2) {
            this.curPhase = 0;
        }
        this.weight = Math.sin(this.curPhase / this.frequency * 25.12)
        console.log(this.weight);
    }
}


class Particle {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.transX = this.x;
        this.transY = this.y;
    }
}