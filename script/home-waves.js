const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

const points = [];
const cols = 40; // Number of columns
const rows = 20; // Number of rows
const spacing = 20; // Space between points
const waveAmplitude = 20; // Amplitude of the wave
const waveFrequency = 0.1; // Frequency of the wave
const waveSpeed = 0.02; // Speed of the wave motion

// Initialize points
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        points.push({
            x: x * spacing,
            y: y * spacing,
            originalY: y * spacing // Store original Y for reference
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const waveOffset = Date.now() * waveSpeed; // Time-based wave movement

    // Draw points
    points.forEach(point => {
        // Calculate wave position based on sine wave
        const waveY = Math.sin(point.x * waveFrequency + waveOffset) * waveAmplitude;

        // Update the Y position of the point based on the wave
        point.y = point.originalY + waveY;

        // Draw the point as a circle
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    });

    requestAnimationFrame(draw); // Loop the drawing
}

draw(); // Start the animation
