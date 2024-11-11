const { Engine, Render, Runner, Bodies, Composite, MouseConstraint, Mouse, World } = Matter;

const engine = Engine.create();
const world = engine.world;
var poopScale = 0.1;
var mousePos = { x: 0, y: 0 };

// Canvas dimensions
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const render = Render.create({
    element: document.body,
    canvas: document.getElementById('world'),
    engine: engine,
    options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: 'rgba(0, 0, 0, 0)'
    }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

// Add boundaries to prevent emojis from falling out of the canvas
const boundaries = [
    Bodies.rectangle(canvasWidth / 2, canvasHeight + 20, canvasWidth, 40, { isStatic: true }), // floor
    Bodies.rectangle(canvasWidth / 2, -20, canvasWidth, 40, { isStatic: true }), // ceiling (top collision)
    Bodies.rectangle(-20, canvasHeight / 2, 40, canvasHeight, { isStatic: true }), // left wall
    Bodies.rectangle(canvasWidth + 20, canvasHeight / 2, 40, canvasHeight, { isStatic: true }) // right wall
];
Composite.add(world, boundaries);

// Function to create poop emoji shapes using an equilateral triangle body
function createPoopEmoji(x, y) {
    const scale = poopScale + (Math.random() / 20);
    const size = scale * 625; // Size of the triangle
    let texture = poopFile;
    if (skin == 20) {
        texture = `/images/poop/${Math.floor(Math.random() * 20)}.svg`;
    }
    const poop = Bodies.polygon(x, y, 3, size, {
        render: {
            sprite: {
                texture: texture,
                xScale: scale,
                yScale: scale
            }
        }
    });

    // Add a history array to keep track of previous positions
    poop.history = [];
    poop.historyLength = 10; // Number of previous positions to store for motion blur

    return poop;
}






// Add mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});
Composite.add(world, mouseConstraint);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

// Track mouse position
document.addEventListener("mousemove", (e) => {
    mousePos = { x: e.clientX, y: e.clientY };
});

// Create a new poop emoji at the cursor position when the spacebar is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === " ") {
        const poop = createPoopEmoji(mousePos.x + Math.random() * 20, mousePos.y + Math.random() * 20);
        Composite.add(world, poop);
    }
});

// Add motion blur effect in the render loop
Matter.Events.on(engine, 'beforeRender', () => {
    // Clear the canvas before drawing each frame (to prevent ghosting)
    const ctx = render.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Redraw all objects with motion blur
    Composite.allBodies(world).forEach(poop => {
        // Store the current position for motion blur
        poop.history.push({ x: poop.position.x, y: poop.position.y });

        // Keep only the last `historyLength` positions
        if (poop.history.length > poop.historyLength) {
            poop.history.shift();
        }

        // Draw motion blur
        const alphaStep = 1 / poop.historyLength;
        poop.history.forEach((pos, index) => {
            const alpha = 1 - alphaStep * index; // Fade effect
            ctx.save();
            ctx.globalAlpha = alpha; // Apply the fading effect

            // Draw the poop emoji at the previous positions
            ctx.drawImage(render.context.canvas, pos.x - 25, pos.y - 25, 50, 50);

            ctx.restore();
        });

        // Draw the poop emoji at its current position
        ctx.drawImage(render.context.canvas, poop.position.x - 25, poop.position.y - 25, 50, 50);
    });
});

var localStorage = window.localStorage;
var money = JSON.parse(localStorage.getItem('money')) || 0;
var skin = JSON.parse(localStorage.getItem('skin')) || 0;
var experience = JSON.parse(localStorage.getItem('experience')) || 0;
const canvas = document.getElementById('world');
const ctx = canvas.getContext("2d");
if (!JSON.parse(localStorage.getItem('money'))) {
    localStorage.setItem("money", JSON.stringify(0));
}
if (!JSON.parse(localStorage.getItem('experience'))) {
    localStorage.setItem("money", JSON.stringify(0));
}
if (!JSON.parse(localStorage.getItem('skin'))) {
    localStorage.setItem("skin", JSON.stringify(0));
}

var poopFile;
if (skin < 20) {
    poopFile = `/images/poop/${skin}.svg`;
} else {
    poopFile = "/images/poop/invalid.svg";
}

document.getElementById("icon").setAttribute("src", poopFile);

function updateMoney() {
    localStorage.setItem("money", JSON.stringify(Math.floor(money)));
    localStorage.setItem("experience", JSON.stringify(Math.floor(experience)));

    return JSON.parse(localStorage.getItem("money"));
}

function addMoney(amount) {
    money += amount;
    experience += amount;
    updateMoney();
    return money;
}

function displayMoney() {
    ctx.font = '30px "Instrument Sans"';
    ctx.fillStyle = '#694d0c';
    document.getElementById("money-count").innerText = "$" + Math.floor(money);
    requestAnimationFrame(displayMoney);
}
requestAnimationFrame(displayMoney);

var rewards = {
    collision: 0.5,
    floating: 0.1
}

// Store all bodies that are colliding
let collidingBodies = new Set();

// Listen for collision start event
Matter.Events.on(engine, 'collisionStart', function(event) {
    // For each pair of bodies that are colliding
    event.pairs.forEach(pair => {
        collidingBodies.add(pair.bodyA);
        collidingBodies.add(pair.bodyB);
    });
});

// Listen for collision end event
Matter.Events.on(engine, 'collisionEnd', function(event) {
    // For each pair of bodies that stopped colliding
    event.pairs.forEach(pair => {
        collidingBodies.delete(pair.bodyA);
        collidingBodies.delete(pair.bodyB);
    });
});

function getNonCollidingBodies() {
    // Get all bodies in the world
    const allBodies = Matter.Composite.allBodies(world);

    // Filter out bodies that are in the collidingBodies set
    const nonCollidingBodies = allBodies.filter(body => !collidingBodies.has(body));

    return nonCollidingBodies;
}

// Listen for collision start event
Matter.Events.on(engine, 'collisionStart', function(event) {
    // The event contains the pairs of bodies that are colliding
    const pairs = event.pairs;

    if (Math.random() > 0.7) {
        addMoney(rewards.collision);
    }
});

setInterval(() => {
    const nonCollidingBodies = getNonCollidingBodies();
    nonCollidingBodies.forEach((body) => {
        if (Math.random() > 0.3) {
            addMoney(rewards.floating);
        }
    })
}, 500)

function resetMoney() {
    money = 0;
    updateMoney();
}

function deletePoops() {
    Composite.clear(world, true);
    Matter.World.add(world, mouseConstraint);

    // Reattach the mouse to the engine (if necessary)
    Matter.Engine.update(engine);
}

// Select all buttons on the page
const buttons = document.querySelectorAll('button');

// Attach the click event to each button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove focus after the button is clicked
        this.blur();
    });
});



// Add some poop emojis to the world
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight / 2;
    const poop = createPoopEmoji(x, y);
    Composite.add(world, poop);
}

function setSkin() {
    const skin = document.getElementById("skin").value;
    localStorage.setItem("skin", JSON.stringify(skin));
    window.location.reload();
}
