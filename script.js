var canvas = document.getElementById("effect");
var ctx = canvas.getContext("2d");
var particles = [];
var particleCount = 150;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouseX = 0;
var mouseY = 0;
var catX = 0;



document.addEventListener("keydown", e => {
  if (e.key == " ") {
    catX = 0;
  }
});

document.addEventListener('mousemove', e => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
  mouseX = e.pageX;
  mouseY = e.pageY;
});

$("#cover").click(function() {
  $(this).fadeOut(500);
  $("container").css("animation", "slideInFromTop 0.5s ease-in-out")
})


class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.dir = randomAngleDownwards()
    this.size = Math.random() * 3 + 1;
  }

  move() {
    this.x += Math.cos(this.dir) * 2;
    this.y += Math.sin(this.dir) * 2;
  }
}
function randomAngleDownwards() {
  // Generate a random number between Math.PI * 0.25 and Math.PI * 0.75
  return Math.random() * (Math.PI * 0.5) + Math.PI * 0.25;
}




function createParticle() {
  return new Particle();
}

for (let i = 0; i < particleCount; i++) {
  let particle = createParticle();
  particle.y = Math.random() * canvas.width / 2;
  particles.push(particle);
}

var tango = new Image("tango.png");

function render() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.drawImage(tango, catX, 500, 50, 50);
  for (let i = 0; i < particles.length; i++) {
    let particle = particles[i];
    particle.move();
    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    if (particle.y > canvas.height) {
      particles.splice(i, 1);
      particles.push(createParticle());
    }
  }
  if (catX < canvas.width) {
    catX += 1.5;
  }
  requestAnimationFrame(render);
}

requestAnimationFrame(render)