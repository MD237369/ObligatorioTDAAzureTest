/* ============================================
   EPIPHONE — index.js
   ============================================ */

// ─── Datos de guitarras con imágenes reales ───────────────────────────────────
const guitars = [
  {
    name: "Les Paul Standard",
    category: "Les Paul Series",
    desc: "El clásico inmortal. Cuerpo de caoba con tapa de arce, pastillas ProBucker.",
    price: "$499",
    img: "https://waltgracevintage.com/cdn/shop/files/IMG_0010-2_e445af11-e6a6-4a61-ad24-d4d10a8bd270.jpg?v=1739306693",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Epiphone_Les_Paul_Standard_1994_%28transparent%29.png/220px-Epiphone_Les_Paul_Standard_1994_%28transparent%29.png",
  },
  {
    name: "Casino",
    category: "Archtop Series",
    desc: "Cuerpo hueco inspirado en los Beatles. Sonido cálido y articulado.",
    price: "$799",
    img: "https://waltgracevintage.com/cdn/shop/files/IMG_4041.jpg?v=1737583800",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Epiphone_Casino_%28transparent%29.png/220px-Epiphone_Casino_%28transparent%29.png",
  },
  {
    name: "SG Standard",
    category: "SG Series",
    desc: "Cuernos agudos, acceso al mástil superior y tono agresivo definido.",
    price: "$449",
    img: "https://peachguitars.2dimg.com/1/097a4510_161ebda5c3.webp",
    fallback: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Epiphone_SG.jpg/220px-Epiphone_SG.jpg",
  },
  {
    name: "Sheraton-II Pro",
    category: "Archtop Series",
    desc: "Semi-hueca de lujo con inlays de bloque y binding elegante.",
    price: "$699",
    img: "https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1673193373824-TJM016YTOMII4LZ0DEY2/0Y1A0018.jpg",
    fallback: "https://media.sweetwater.com/api/i/f-webp__q-82__ha-cfd4a2f1aac7fb9a__hmac-fc8cbf5bce7a56226ef27e4e7b8b9b95f0f3e3b4/images/items/750/Sheraton2ProVS-large.jpg",
  },
  {
    name: "Flying V",
    category: "Inspired By Gibson",
    desc: "Forma radical y tono de rock puro. Inspirada en el diseño original de 1958.",
    price: "$549",
    img: "https://cdn.awsli.com.br/600x700/1005/1005709/produto/359843172/bca3ed56e53932ce340df261126139be-x09usvfjyy.jpg",
    fallback: "https://media.sweetwater.com/api/i/f-webp__q-82/images/items/750/FlyingVEbony-large.jpg",
  },
  {
    name: "ES-335",
    category: "ES Series",
    desc: "Semi-hueca versátil. Perfecta para jazz, blues y rock clásico.",
    price: "$599",
    img: "https://www.guitarpusher.com/cdn/shop/products/EPAR335-ET3PCHNH3IMG_4511.jpg?v=1618678044",
    fallback: "https://media.sweetwater.com/api/i/f-webp__q-82/images/items/750/DotCH-large.jpg",
  },
];

// ─── Renderizar cards ──────────────────────────────────────────────────────────
function renderGuitars() {
  const grid = document.getElementById("guitar-grid");
  if (!grid) return;

  guitars.forEach((g, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 0.1}s`;
    card.innerHTML = `
      <div class="card__img-wrap">
        <img
          class="card__img"
          src="${g.img}"
          alt="${g.name}"
          loading="lazy"
          onerror="this.src='${g.fallback}'"
        />
      </div>
      <div class="card__body">
        <p class="card__category">${g.category}</p>
        <h3 class="card__name">${g.name}</h3>
        <p class="card__desc">${g.desc}</p>
        <p class="card__price">${g.price}</p>
      </div>
    `;
    card.addEventListener("click", () => showToast(`🎸 ${g.name} agregada al interés`));
    grid.appendChild(card);
  });
}

// ─── Counter animado ───────────────────────────────────────────────────────────
function animateCounters() {
  const nums = document.querySelectorAll(".stat__num");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(ease * target).toLocaleString("es-ES");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );
  nums.forEach((n) => observer.observe(n));
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─── Formulario ────────────────────────────────────────────────────────────────
function handleForm(e) {
  e.preventDefault();
  showToast("✉ ¡Suscripción exitosa!");
  e.target.reset();
}

// ─── Deploy info ───────────────────────────────────────────────────────────────
function setDeployInfo() {
  const el = document.getElementById("deploy-time");
  if (el) el.textContent = new Date().toLocaleString("es-ES");
}

// ─── Nav scroll ────────────────────────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav");
  if (nav) nav.style.background = window.scrollY > 50 ? "rgba(10,8,5,.97)" : "linear-gradient(to bottom, rgba(10,8,5,.95), transparent)";
});

// ─── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderGuitars();
  animateCounters();
  setDeployInfo();
  console.log("%c🎸 Epiphone Site — Deploy OK", "color:#c9973a;font-size:1.2rem;font-weight:bold;");
});
