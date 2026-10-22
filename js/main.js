// Preloader Signature Dismiss (3 Seconds as requested)
window.addEventListener('load', function() {
  setTimeout(function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 600);
    }
  }, 3000);
});

// Fallback safety timeout
setTimeout(function() {
  var preloader = document.getElementById('preloader');
  if (preloader && !preloader.classList.contains('fade-out')) {
    preloader.classList.add('fade-out');
  }
}, 3800);

// Filter Pills logic for Technical Arsenal
document.querySelectorAll('.filter-pills .pill').forEach(function(pill) {
  pill.addEventListener('click', function() {
    document.querySelectorAll('.filter-pills .pill').forEach(function(p) { p.classList.remove('active'); });
    this.classList.add('active');
    var filter = this.getAttribute('data-filter');
    document.querySelectorAll('#arsenalGrid .arsenal-card').forEach(function(card) {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// Copy Email functionality
var copyBtn = document.getElementById('copyBtn');
var emailVal = document.getElementById('emailVal');
if (copyBtn && emailVal) {
  copyBtn.addEventListener('click', function() {
    var email = emailVal.textContent.trim();
    navigator.clipboard.writeText(email).then(function() {
      copyBtn.textContent = 'Copied!';
      setTimeout(function() { copyBtn.textContent = 'Copy'; }, 2000);
    });
  });
}