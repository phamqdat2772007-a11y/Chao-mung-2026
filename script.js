const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("startBtn");
const music = document.getElementById("music");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let started = false;

// Các màu sắc đa dạng cho pháo hoa
const colors = ["red", "yellow", "orange", "blue", "green", "purple", "pink", "cyan"];

btn.addEventListener("click", () => {
    if (!started) {
        started = true;
        btn.style.display = "none";
        music.volume = 1;
        music.play().catch(() => { alert("Bấm lại Play nếu nhạc chưa phát"); });
        setInterval(createFirework, 400); // nhiều pháo hơn
        animate();
    }
});

function createFirework() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height / 2;

    let color = colors[Math.floor(Math.random() * colors.length)];
    let size = Math.random() * 3 + 2;

    for (let i = 0; i < 80; i++) {
        particles.push({
            x, y,
            dx: (Math.random() - 0.5) * 8,
            dy: (Math.random() - 0.5) * 8,
            life: Math.random() * 80 + 50,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: size
        });
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vẽ các sao nhỏ trên bầu trời
    for (let i = 0; i < 100; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
    }

    particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
