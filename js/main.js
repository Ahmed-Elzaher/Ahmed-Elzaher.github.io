// Preloader Dismiss (Snappy 1.4s tech intro)
window.addEventListener('load', () => {
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 1400);
});

// Fallback safety timeout
setTimeout(() => {
  const preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
}, 2200);

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