const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

const points = [];
const wavePoints = [];
const numWaves = 5; // Number of wave points
const numPoints = 100; // Total points
const spacing = 10; // Spacing for points
const gravityStrength = 0.1; // Strength of the pull towards wave points

// Initialize wave points randomly across the canvas
for (let i = 0; i < numWaves; i++) {
    wavePoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
    });
}

// Initialize points in a grid pattern
for (let i = 0; i < numPoints; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        originalY: Math.random() * canvas.height, // Store original Y for reference
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset points to their original positions
    points.forEach(point => {
        point.y = point.originalY; // Reset to original Y position
    });

    // Apply gravity towards wave points
    points.forEach(point => {
        let nearestWave = wavePoints[0];
        let nearestDistance = Infinity;

        // Find the nearest wave point
        wavePoints.forEach(wave => {
            const distance = Math.hypot(wave.x - point.x, wave.y - point.y);
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestWave = wave;
            }
        });

        // Calculate the pull towards the nearest wave point
        const dx = nearestWave.x - point.x;
        const dy = nearestWave.y - point.y;

        // Move the point towards the wave point based on gravity
        point.x += dx * gravityStrength;
        point.y += dy * gravityStrength;
    });

    // Draw wave points
    ctx.fillStyle = 'red';
    wavePoints.forEach(wave => {
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, 8, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw points
    ctx.fillStyle = 'blue';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(draw); // Loop the drawing
}

draw(); // Start the animation
