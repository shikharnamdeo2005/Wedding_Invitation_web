/**
 * Jagruti Weds Ankit — Wedding Invitation Script
 * Features: Loading screen, Language toggle, Petal animation,
 *           Scroll reveal, Countdown timer, Music toggle, Navbar
 */

/* =====================================================
   1. LOADING SCREEN
   ===================================================== */
// window.addEventListener('load', () => {
//   const loader = document.getElementById('loader');
//   setTimeout(() => {
//     loader.classList.add('hidden');
//   }, 3000);
// });

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');

  setTimeout(() => {
    loader.classList.add('hidden');
  }, 4500);
});

// window.addEventListener('load', () => {
//   const loader = document.getElementById('loader');
//   const video = document.getElementById('loader-video');

//   // Wait for video to play (or fallback after 4 sec)
//   let timeout = setTimeout(() => {
//     loader.classList.add('hidden');
//   }, 4000);

//   // If video ends early → hide loader
//   video.addEventListener('ended', () => {
//     clearTimeout(timeout);
//     loader.classList.add('hidden');
//   });
// });

/* =====================================================
   2. LANGUAGE TOGGLE (Hindi ↔ English)
   ===================================================== */
let currentLang = localStorage.getItem('lang') || 'hi';

const langBtn = document.getElementById('lang-btn');

function applyLanguage(lang) {
  document.querySelectorAll('[data-hi]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text !== null) {
      el.textContent = text;
    }
  });

  document.documentElement.lang = lang;
  langBtn.textContent = lang === 'hi' ? 'हिंदी | English' : 'English | हिंदी';
}

// Initial load
applyLanguage(currentLang);

// Toggle
langBtn.addEventListener('click', () => {
  currentLang = currentLang === 'hi' ? 'en' : 'hi';
  localStorage.setItem('lang', currentLang);
  applyLanguage(currentLang);
});

/* =====================================================
   3. FLOATING PETAL ANIMATION
   ===================================================== */
const PETALS = ['🌸', '🌺', '🌼', '🍂', '🌹', '💐'];
const petalContainer = document.getElementById('petals-container');

function createPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  petal.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];

  // Random horizontal position
  petal.style.left = Math.random() * 100 + 'vw';
  // Random size 12–24px
  petal.style.fontSize = (12 + Math.random() * 12) + 'px';
  // Random duration 6–14s
  const dur = 6 + Math.random() * 8;
  petal.style.animationDuration = dur + 's';
  // Stagger start
  petal.style.animationDelay = (Math.random() * 8) + 's';
  petal.style.opacity = '0';

  petalContainer.appendChild(petal);

  // Remove petal after animation ends to avoid DOM bloat
  petal.addEventListener('animationend', () => petal.remove());
}

// Spawn petals at an interval
function spawnPetals() {
  // Initial burst
  for (let i = 0; i < 18; i++) createPetal();
  // Ongoing
  setInterval(createPetal, 1200);
}

// Start petals after loader clears
setTimeout(spawnPetals, 2600);


/* =====================================================
   4. SCROLL REVEAL
   ===================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* =====================================================
   5. COUNTDOWN TIMER
   ===================================================== */
// Target: 5 May 2026, 19:00:00 IST (UTC+5:30)
const WEDDING_DATE = new Date('2026-05-05T19:00:00+05:30');

const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMins = document.getElementById('cd-mins');
const cdSecs = document.getElementById('cd-secs');
const cdDone = document.getElementById('countdown-done');
const cdGrid = document.querySelector('.countdown-grid');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    // Wedding has happened / happening now
    cdGrid.classList.add('hidden');
    cdDone.classList.remove('hidden');
    // Show in current language
    cdDone.textContent = cdDone.getAttribute(`data-${currentLang}`);
    return;
  }

  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMins.textContent = pad(mins);
  cdSecs.textContent = pad(secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =====================================================
   6. MUSIC TOGGLE
   Uses a freely embeddable public domain / royalty-free URL.
   Replace `MUSIC_SRC` with your own audio file path.
   ===================================================== */

const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");

let isPlaying = false;
let userInteracted = false;

// Try autoplay (muted)
window.addEventListener("load", () => {
  audio.play().catch(() => {
    console.log("Autoplay blocked");
  });
});

// 🔥 Auto unmute on FIRST user interaction anywhere
document.addEventListener("click", () => {
  if (!userInteracted) {
    audio.muted = false;
    audio.play();
    musicIcon.textContent = "⏸️";
    musicBtn.title = "Pause Music";
    isPlaying = true;
    userInteracted = true;
  }
}, { once: true });


// Button toggle
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent double trigger

  if (isPlaying) {
    audio.pause();
    musicIcon.textContent = "🎵";
    musicBtn.title = "Play Music";
    isPlaying = false;
  } else {
    audio.muted = false;
    audio.play();
    musicIcon.textContent = "⏸️";
    musicBtn.title = "Pause Music";
    isPlaying = true;
  }
});

/* =====================================================
   7. STICKY NAVBAR — highlight & shrink on scroll
   ===================================================== */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Add 'scrolled' class when user scrolls down
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });

  document.querySelectorAll('#navbar a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();


/* =====================================================
   8. SMOOTH SCROLL for nav links
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* =====================================================
   9. GALLERY — subtle tilt effect on hover
   ===================================================== */
document.querySelectorAll('.gallery-img-wrap').forEach(wrap => {
  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    wrap.style.transform = `scale(1.04) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  wrap.addEventListener('mouseleave', () => {
    wrap.style.transform = '';
  });
});


/* =====================================================
   10. EVENT CARDS — sparkle on hover
   ===================================================== */
document.querySelectorAll('.event-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.35s, box-shadow 0.35s, border-color 0.3s';
  });
});


/* =====================================================
   11. SECTION BG PARALLAX — subtle depth
   ===================================================== */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.backgroundPositionY = `${scrolled * 0.35}px`;
  }
}, { passive: true });


/* =====================================================
   12. COUNTDOWN — re-translate labels when lang changes
   ===================================================== */
// Hook into the language switch to update countdown label text & done message
const _origSetLanguage = setLanguage;
// Override setLanguage to also refresh countdown done message
function setLanguage(lang) {
  _origSetLanguage(lang);
  // If countdown finished, update message language
  if (cdDone && !cdDone.classList.contains('hidden')) {
    cdDone.textContent = cdDone.getAttribute(`data-${lang}`);
  }
}
// Replace the button click handler to use extended version
langBtn.onclick = () => {
  setLanguage(currentLang === 'hi' ? 'en' : 'hi');
};