document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10; // Adjust range for parallax
    const y = (e.clientY / window.innerHeight) * 20 - 10; // Adjust range for parallax
    document.querySelector('.background').style.transform = `translate(${x}px, ${y}px)`;
});
