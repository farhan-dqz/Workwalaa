// =========================================
// MAIN JAVASCRIPT FUNCTIONALITY
// =========================================

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile Menu Logic
const mobileMenuOpen = document.getElementById('mobile-menu-open');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuOpen && mobileMenuClose && mobileMenu) {
  mobileMenuOpen.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });

  mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Simple Typewriter / Word Rotate Effect
const words = ["Worth.", "Talent.", "Purpose.", "Growth."];
let wordIndex = 0;
const typedText = document.getElementById('typed-text');

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  typedText.style.opacity = 0;
  setTimeout(() => {
    typedText.innerText = words[wordIndex];
    typedText.style.opacity = 1;
  }, 300); // match fade transition
}, 3000);

typedText.style.transition = "opacity 0.3s ease";

// Contact Form Submission Handler
function handleContactSubmit(event) {
  event.preventDefault(); // Prevent actual submission

  const btn = document.getElementById('contactSubmitBtn');
  const overlay = document.getElementById('contactSuccessOverlay');
  const form = document.getElementById('mainContactForm');

  const networkConnecting = document.getElementById('networkConnectingContent');
  const contactSuccess = document.getElementById('contactSuccessContent');

  // Loading State for button
  btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
  btn.style.opacity = '0.8';
  btn.style.pointerEvents = 'none';

  // Reset overlay states to showing animation first
  networkConnecting.style.display = 'block';
  contactSuccess.style.display = 'none';

  // Show overlay immediately over the form
  overlay.classList.add('active');

  // Stage 1: Network Connecting Animation lasts 2.5 seconds
  setTimeout(() => {
    // Switch to success state
    networkConnecting.style.display = 'none';
    contactSuccess.style.display = 'block';

    // Reset form in background
    form.reset();

    // Reset button state
    btn.innerHTML = "Send Message";
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';

    // Stage 2: Auto-close overlay after 3 seconds of success
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 3000);

  }, 2500);
}
