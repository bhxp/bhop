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
        background: '#333' // Set the background color to #333 (dark gray)
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
    const poop = Bodies.polygon(x, y, 3, size, {
        render: {
            sprite: {
                texture: '/images/poop.svg',
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

// Add some poop emojis to the world
for (let i = 0; i < 10; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight / 2;
    const poop = createPoopEmoji(x, y);
    Composite.add(world, poop);
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
        const poop = createPoopEmoji(mousePos.x, mousePos.y);
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
