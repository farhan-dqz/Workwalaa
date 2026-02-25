// =========================================
// WISHLIST FUNCTIONALITY
// =========================================

// Wishlist Toggle & Satisfying Success Animation
const btnWishlist = document.getElementById('btnWishlist');
const wishlistContainer = document.getElementById('wishlistContainer');
const wishlistEmail = document.getElementById('wishlistEmail');
const wishlistForm = document.getElementById('wishlistForm');
const successOverlay = document.getElementById('successOverlay');

if (btnWishlist && wishlistContainer) {
  btnWishlist.addEventListener('click', () => {
    // Reset state if opened again
    if (successOverlay) successOverlay.classList.remove('active');
    if (wishlistForm) wishlistForm.style.opacity = '1';
    if (wishlistEmail) wishlistEmail.value = '';

    wishlistContainer.classList.toggle('active');
    if (wishlistContainer.classList.contains('active')) {
      setTimeout(() => wishlistEmail.focus(), 300);
    }
  });
}

if (wishlistForm) {
  wishlistForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Hide form inputs and trigger satisfying success UI
    wishlistForm.style.opacity = '0';
    wishlistForm.style.pointerEvents = 'none';

    if (successOverlay) {
      successOverlay.classList.add('active');

      // Optionally, auto-close the whole dropdown after a few seconds
      setTimeout(() => {
        wishlistContainer.classList.remove('active');
        setTimeout(() => {
          wishlistForm.style.opacity = '1';
          wishlistForm.style.pointerEvents = 'auto';
          successOverlay.classList.remove('active');
          wishlistEmail.value = '';
        }, 500); // Wait for dropdown menu to hide before resetting
      }, 2500);
    }
  });
}
