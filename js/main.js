// ---------------------------------------------------------------
// Konfiguration
// ---------------------------------------------------------------
const WEDDING_DATE = new Date('2026-10-10T11:00:00+02:00');

// ---------------------------------------------------------------
// Header: Scroll-Zustand + Fortschrittsbalken
// ---------------------------------------------------------------
const header = document.getElementById('siteHeader');
const progressBar = document.getElementById('progressBar');

function onScroll(){
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 60);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}
document.addEventListener('scroll', onScroll, { passive:true });
onScroll();

// ---------------------------------------------------------------
// Mobile Navigation
// ---------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------------------
// Countdown
// ---------------------------------------------------------------
const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');

function updateCountdown(){
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0){
    cdDays.textContent = '0'; cdHours.textContent = '0';
    cdMins.textContent = '0'; cdSecs.textContent = '0';
    return;
  }
  const s = Math.floor(diff / 1000);
  cdDays.textContent = Math.floor(s / 86400);
  cdHours.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2,'0');
  cdMins.textContent = String(Math.floor((s % 3600) / 60)).padStart(2,'0');
  cdSecs.textContent = String(s % 60).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------------------------------------------------------------
// Scroll-Reveal
// ---------------------------------------------------------------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------------------------------------------------------------
// Zimmereinteilung Modal
// ---------------------------------------------------------------
const zimmerModal = document.getElementById('zimmerModal');
const openZimmerBtn = document.getElementById('openZimmerModal');
const closeZimmerBtn = document.getElementById('zimmerModalClose');
const zimmerBackdrop = document.getElementById('zimmerModalBackdrop');

function openModal(){
  zimmerModal.classList.add('is-open');
  zimmerModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  zimmerModal.classList.remove('is-open');
  zimmerModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
openZimmerBtn.addEventListener('click', openModal);
closeZimmerBtn.addEventListener('click', closeModal);
zimmerBackdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
