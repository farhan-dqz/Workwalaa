// =========================================
// THEME TOGGLER FUNCTIONALITY
// =========================================

// Apply theme immediately to prevent FOUC
const savedTheme = localStorage.getItem('workwalaa_theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('light-theme');
  document.body.classList.add('light-theme');
}

function initializeTheme() {
  // Also apply class to body if it was added to documentElement
  if (document.documentElement.classList.contains('light-theme')) {
    document.body.classList.add('light-theme');
  }

  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggleBtn && themeIcon) {
    if (document.body.classList.contains('light-theme')) {
      themeIcon.classList.replace('bx-sun', 'bx-moon');
    }

    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      document.documentElement.classList.toggle('light-theme');

      if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('workwalaa_theme', 'light');
        themeIcon.classList.replace('bx-sun', 'bx-moon');
      } else {
        localStorage.setItem('workwalaa_theme', 'dark');
        themeIcon.classList.replace('bx-moon', 'bx-sun');
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
  initializeTheme();
}
