const canvas = document.getElementById('sparkle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Sparkle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.5;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.speedAlpha = (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1);
        this.color = Math.random() > 0.4 ? '#ff7700' : '#ffc400';
    }

    update() {
        this.alpha += this.speedAlpha;
        if (this.alpha <= 0.1 || this.alpha >= 0.95) {
            this.speedAlpha *= -1;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function initSparkles() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < 85; i++) {
        particles.push(new Sparkle());
    }
}

function animateSparkles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateSparkles);
}

function setupPasswordToggle() {
    const toggleBtn = document.getElementById('togglePassword');
    const pwdInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (toggleBtn && pwdInput) {
        toggleBtn.addEventListener('click', () => {
            const isPassword = pwdInput.type === 'password';
            pwdInput.type = isPassword ? 'text' : 'password';
            eyeIcon.className = isPassword ? 'fa-solid fa-eye-slash text-xs' : 'fa-solid fa-eye text-xs';
        });
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('directorLoginForm');
    const toast = document.getElementById('toast');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const numAcceso = document.getElementById('numAcceso').value;
            const password = document.getElementById('password').value;

            if (numAcceso === '250225' && password === 'doryan2009') {
                toast.classList.remove('translate-x-96', 'opacity-0');
                toast.classList.add('translate-x-0', 'opacity-100');
                
                setTimeout(() => {
                    window.location.href = 'panel_control.html';
                }, 1500);
            } else {
                alert('Número de acceso o contraseña incorrectos.');
            }
        });
    }
}

window.addEventListener('resize', resizeCanvas);

window.onload = () => {
    initSparkles();
    animateSparkles();
    setupPasswordToggle();
    setupLoginForm();

    VanillaTilt.init(document.querySelector(".glass-outer"), {
        max: 6,
        speed: 500,
        glare: true,
        "max-glare": 0.15,
    });
};