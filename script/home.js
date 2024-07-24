const navbar = $("#navbar");

$(document).ready ((e) => {
    fetch ("/config/home_navbar.json")
        .then (response => response.json())
        .then (items => {
            items.forEach (item => {
                let element = $ ("<div>");
                element.text (item.text)
                element.attr ("onclick", `window.open ("${item.url}");`);
                navbar.append (element);
            });
        });
        .catch (error => {
            console.error (error);
        });
});