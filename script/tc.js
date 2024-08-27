document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 20 - 10;
    const y = (e.clientY / window.innerHeight) * 20 - 10;
    document.querySelector('.background').style.transform = `translate(${x}px, ${y}px)`;
});
