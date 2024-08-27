document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 10 - 5; // Adjusted range
    const y = (e.clientY / window.innerHeight) * 10 - 5; // Adjusted range
    document.querySelector('.background').style.transform = `translate(${x}px, ${y}px)`;
});
