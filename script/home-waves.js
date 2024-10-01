const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

const points = [];
const cols = 40; // Number of columns
const rows = 20; // Number of rows
const spacing = 20; // Space between points
const waveAmplitude = 20; // Amplitude of the wave
const waveFrequency = 0.1; // Frequency of the wave
const depthFactor = 0.05; // Depth factor to simulate points moving towards the camera

// Initialize points
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        points.push({
            x: x * spacing,
            y: y * spacing,
            originalY: y * spacing, // Store original Y for reference
            weight: Math.random() * 2 + 0.5 // Random weight between 0.5 and 2
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const waveOffset = Date.now() * 0.002; // Time-based wave movement

    // Draw points
    points.forEach(point => {
        // Calculate wave position based on sine wave
        const waveY = Math.sin(point.x * waveFrequency + waveOffset) * waveAmplitude;

        // Calculate distance to the wave
        const distanceToWave = waveY - point.originalY; // Move towards the wave from original position

        // Calculate new Y position based on wave influence and depth
        point.y = point.originalY + distanceToWave * depthFactor * point.weight;

        // Draw the point as a circle
        ctx.beginPath();
        const size = (1 - Math.abs(distanceToWave) / waveAmplitude) * 4; // Size based on distance to wave
        ctx.arc(point.x, point.y, size > 0 ? size : 0, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(draw); // Loop the drawing
}

draw(); // Start the animation
e