document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.querySelector('.background').style.transform = `translate(-${x * 10}px, -${y * 10}px)`;
});
