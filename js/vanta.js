// =========================================
// VANTA.JS BACKGROUND ANIMATION
// =========================================

// 3D Interactive Backgrounds (Vanta.js)
// Runs after page has loaded
window.addEventListener('DOMContentLoaded', () => {
  if (window.VANTA) {
    // Main ambient background
    window.VANTA.NET({
      el: "#ambient-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xf2ca00,
      backgroundColor: 0x030303,
      points: 12.00,
      maxDistance: 25.00,
      spacing: 18.00,
      showDots: true
    });
  }
});
