const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

window.onresize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
};

const stars = [];
const rockets = [];
const particles = [];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

// 🌟 SAO
for (let i = 0; i < 300; i++) {
    stars.push({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        r: rand(0.3, 1.8),
        a: rand(0.3, 1),
        tw: rand(0.005, 0.02)
    });
}

function drawStars() {
    stars.forEach(s => {
        s.a += s.tw;
        if (s.a <= 0.3 || s.a >= 1) s.tw *= -1;
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
    });
}

// 🚀 PHÁO BAY
function launch() {
    rockets.push({
        x: rand(100, canvas.width - 100),
        y: canvas.height,
        vy: rand(-10, -13),
        color: `hsl(${rand(0,360)},100%,60%)`
    });
}

function explode(x, y, color) {
    const shapes = ["circle", "heart", "star"];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    for (let i = 0; i < 120; i++) {
        let angle = Math.random() * Math.PI * 2;
        let speed = rand(2, 6);

        if (shape === "heart") {
            angle = i * Math.PI / 60;
            speed = 4;
        }

        particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: rand(60, 120),
            color
        });
    }
}

// ✨ VÒNG LẶP
function animate() {
    ctx.fillStyle =  "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStars();

    rockets.forEach((r, i) => {
        r.y += r.vy;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (r.y < canvas.height / 2) {
            explode(r.x, r.y, r.color);
            rockets.splice(i, 1);
        }
    });

    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
    });

    requestAnimationFrame(animate);
}

// ▶️ BẮT ĐẦU
document.getElementById("startBtn").onclick = () => {
    document.getElementById("music").play();
    setInterval(launch, 600);
    animate();
    document.querySelector(".overlay").style.display = "none";
};
