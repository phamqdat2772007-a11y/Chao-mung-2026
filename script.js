const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");
const music = document.getElementById("music");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let started = false;

btn.addEventListener("click", () => {
    if (!started) {
        started = true;
        btn.style.display = "none";
        document.getElementById("note").style.display = "none";

        music.volume = 1;
        music.play().catch(() => {
            alert("👉 Bấm lại lần nữa để bật nhạc nhé!");
        });

        setInterval(createFirework, 500);
        animate();
    }
});

function createFirework() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2;

    for (let i = 0; i < 80; i++) {
        particles.push({
            x,
            y,
            dx: (Math.random() - 0.5) * 7,
            dy: (Math.random() - 0.5) * 7,
            life: 120
        });
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        ctx.fillStyle = "orange";
        ctx.fillRect(p.x, p.y, 3, 3);
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
