document.getElementById('temperatureForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cpuTemp = parseFloat(document.getElementById('cpuTemp').value);
    const gpuTemp = parseFloat(document.getElementById('gpuTemp').value);
    const extraTemp1 = parseFloat(document.getElementById('extraTemp1').value);
    const extraTemp2 = parseFloat(document.getElementById('extraTemp2').value);

    // Array to hold valid temperatures
    const temperatures = [cpuTemp, gpuTemp];

    // Add optional temperatures if they are provided
    if (!isNaN(extraTemp1)) temperatures.push(extraTemp1);
    if (!isNaN(extraTemp2)) temperatures.push(extraTemp2);

    // Calculate the average temperature
    const averageTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;

    // Display the result
    document.getElementById('averageTemp').textContent = averageTemp.toFixed(2);
});
