
// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 20 + 'px';
  ring.style.top = ry - 20 + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, .skill-pill, .contact-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.8'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '40px'; ring.style.height = '40px'; ring.style.opacity = '0.5'; });
});

// TYPED TEXT
const words = ['UI/UX Craftsman', 'React Developer', 'Interface Architect', 'Creative Coder', 'Web Artisan'];
let wi = 0, ci = 0, del = false;
const el = document.getElementById('typed-text');
function type() {
  const w = words[wi];
  if (!del) {
    el.textContent = w.slice(0, ci++);
    if (ci === w.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = w.slice(0, --ci);
    if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
  }
  setTimeout(type, del ? 60 : 90);
}
type();

// REVEAL ON SCROLL
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(r => obs.observe(r));

// SKILL BARS
const barFills = document.querySelectorAll('.bar-fill');
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('animated');
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
barFills.forEach(b => barObs.observe(b));

// FORM
function submitForm() {
  const n = document.getElementById('f-name').value;
  const em = document.getElementById('f-email').value;
  const s = document.getElementById('f-subject').value;
  const m = document.getElementById('f-message').value;
  if (!n || !em || !s || !m) { alert('Please fill all fields!'); return; }
  document.getElementById('form-success').style.display = 'block';
  ['f-name','f-email','f-subject','f-message'].forEach(id => document.getElementById(id).value = '');
  setTimeout(() => document.getElementById('form-success').style.display = 'none', 4000);
}

// MOBILE MENU
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = 'display:flex; flex-direction:column; position:absolute; top:100%; left:0; right:0; background:var(--surface); padding:20px 6vw; border-bottom:1px solid var(--border); gap:20px;';
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.style.display = 'none'));
  }
}

// NAV SHRINK
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.padding = window.scrollY > 50 ? '14px 6vw' : '20px 6vw';
});




document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');

    // ❌ skip empty "#"
    if (href === "#") return;

    e.preventDefault();

    const t = document.querySelector(href);
    if (t) {
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
