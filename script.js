/* CARBIX INDIA — script.js (shared all themes) */

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (open) { spans[0].style.cssText='transform:translateY(7px) rotate(45deg)'; spans[1].style.cssText='opacity:0;transform:scaleX(0)'; spans[2].style.cssText='transform:translateY(-7px) rotate(-45deg)'; }
  else { spans.forEach(s=>s.style.cssText=''); }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => { navLinks.classList.remove('open'); hamburger.querySelectorAll('span').forEach(s=>s.style.cssText=''); });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (!t) return; e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const sibs = Array.from(en.target.parentElement.querySelectorAll('.reveal'));
      en.target.style.transitionDelay = Math.min(sibs.indexOf(en.target) * 80, 400) + 'ms';
      en.target.classList.add('visible'); obs.unobserve(en.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

function openPDF(path) {
  if (!path || path.startsWith('PDF_')) {
    alert('PDF path not yet configured.\n\nEdit theme1.html (or whichever theme you use) and replace:\n  PDF_TURNING_INSERTS_PATH\nwith your actual Google Drive share URL like:\n  https://drive.google.com/file/d/YOUR_ID/view\n\nDo this for each product card onclick attribute.');
    return;
  }
  window.open(path, '_blank');
}

function countUp(el, target, suffix) {
  let start = null;
  const step = ts => { if (!start) start=ts; const p=Math.min((ts-start)/1600,1); el.textContent=Math.floor((1-Math.pow(1-p,3))*target)+suffix; if(p<1)requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { const raw=parseInt(en.target.textContent.replace(/\D/g,''),10); const suf=en.target.textContent.includes('+')?'+':''; if(raw)countUp(en.target,raw,suf); statObs.unobserve(en.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statObs.observe(el));

const form = document.getElementById('contactForm');
const ok   = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault(); const btn=form.querySelector('button[type="submit"]');
    btn.textContent='Sending…'; btn.style.opacity='0.7'; btn.disabled=true;
    setTimeout(() => { form.querySelectorAll('input,textarea,select').forEach(el=>el.value=''); btn.textContent='Send Message →'; btn.style.opacity=''; btn.disabled=false; ok.classList.add('show'); setTimeout(()=>ok.classList.remove('show'),6000); }, 1400);
  });
}

const hg = document.querySelector('.hero-grid-overlay');
window.addEventListener('scroll', () => { if(hg) hg.style.transform=`translateY(${window.scrollY*0.15}px)`; }, { passive: true });
