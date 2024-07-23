const message = "get raped!";
const windows = [];

function createMovingWindow() {
    const newWindow = window.open("", "", "width=200,height=100");
    if (newWindow) {
        newWindow.document.write(`<p style="font-size:20px;color:red;text-align:center;">${message}</p>`);
        newWindow.document.title = message;
        newWindow.moveTo(Math.random() * screen.width, Math.random() * screen.height);
        newWindow.focus();
        windows.push(newWindow);
    }
}

setInterval(() => {
    createMovingWindow();
}, 30);

window.addEventListener('beforeunload', () => {
    windows.forEach(win => win.close());
});
