const canvas = document.getElementById('waveCanvas');
        const ctx = canvas.getContext('2d');

        const points = [];
        const cols = 40; // Number of columns
        const rows = 20; // Number of rows
        const spacing = 20; // Space between points
        const waveAmplitude = 50; // Amplitude of the wave
        const waveFrequency = 0.1; // Frequency of the wave

        // Initialize points
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                points.push({
                    x: x * spacing,
                    y: y * spacing,
                    weight: Math.random() * 2 + 0.5 // Random weight between 0.5 and 2
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const waveOffset = Date.now() * 0.002; // Time-based wave movement

            // Draw points
            points.forEach(point => {
                const waveY = Math.sin(point.x * waveFrequency + waveOffset) * waveAmplitude;

                // Calculate distance to the wave
                const distanceToWave = point.y - waveY;

                // Calculate force based on distance and weight
                const force = distanceToWave * point.weight * 0.1;

                // Update point position
                point.y -= force; // Move point towards the wave

                // Draw the point
                ctx.beginPath();
                ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.closePath();
            });

            requestAnimationFrame(draw); // Loop the drawing
        }

        draw(); // Start the animation