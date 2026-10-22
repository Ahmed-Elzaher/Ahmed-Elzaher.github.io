// Preloader Signature Dismiss (3 Seconds duration as configured, GPU & Memory Optimized)
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.remove(); // Remove from DOM completely to release GPU layer and memory
      }, 500);
    }
  }, 3000);
});

// Fallback safety timeout in case load event was already fired
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }
}, 3800);

// Filter Pills logic for Technical Arsenal
const pills = document.querySelectorAll('.filter-pills .pill');
const arsenalCards = document.querySelectorAll('#arsenalGrid .arsenal-card');

pills.forEach((pill) => {
  pill.addEventListener('click', (event) => {
    const target = event.currentTarget;
    pills.forEach((p) => p.classList.remove('active'));
    target.classList.add('active');
    const filter = target.getAttribute('data-filter');

    arsenalCards.forEach((card) => {
      const match = filter === 'all' || card.getAttribute('data-category') === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// Copy Email functionality with error handling
const copyBtn = document.getElementById('copyBtn');
const emailVal = document.getElementById('emailVal');

if (copyBtn && emailVal) {
  copyBtn.addEventListener('click', async () => {
    const email = emailVal.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}