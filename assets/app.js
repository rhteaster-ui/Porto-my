const doc = document.documentElement;
const progress = document.querySelector('.scroll-progress');
const glow = document.querySelector('.cursor-glow');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

function updateProgress() {
  const total = doc.scrollHeight - window.innerHeight;
  const ratio = total > 0 ? window.scrollY / total : 0;
  if (progress) progress.style.height = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateProgress();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

if (!reduceMotion && !coarsePointer && glow) {
  let x = 0;
  let y = 0;
  let gx = 0;
  let gy = 0;

  window.addEventListener('pointermove', (event) => {
    x = event.clientX;
    y = event.clientY;
    glow.style.opacity = '1';
  }, { passive: true });

  function animateGlow() {
    gx += (x - gx) * 0.14;
    gy += (y - gy) * 0.14;
    glow.style.transform = `translate3d(${gx - 170}px, ${gy - 170}px, 0)`;
    window.requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

if (!reduceMotion && !coarsePointer) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateX(${5 - py * 8}deg) rotateY(${-8 + px * 10}deg) translateZ(0)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = 'rotateX(5deg) rotateY(-8deg) translateZ(0)';
    });
  });

  document.querySelectorAll('.module-card, .case-file').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const mx = ((event.clientX - rect.left) / rect.width) * 100;
      const my = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    }, { passive: true });
  });
}
