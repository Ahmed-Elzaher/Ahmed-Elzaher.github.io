// ==================== EmailJS Config — fill these in after creating your EmailJS account ====================
// 1. Go to https://www.emailjs.com → sign in → Email Services → add your Gmail → copy Service ID
// 2. Go to Email Templates → create a template → copy Template ID
// 3. Go to Account → API Keys → copy your Public Key
const EMAILJS_SERVICE_ID  = 'Elzaher_13';
const EMAILJS_TEMPLATE_ID = 'template_yg7p8b6';
const EMAILJS_PUBLIC_KEY  = 'qtQ29ESrVxpyX7ozh';

// ==================== Preloader Signature Dismiss (3 Seconds duration, GPU & Memory Optimized) ====================
window.addEventListener('load', () => {
  // Initialize EmailJS
  if (window.emailjs) {
    window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

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

// ==================== Filter Pills — Technical Arsenal ====================
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

// ==================== Copy Email ====================
const copyBtn   = document.getElementById('copyBtn');
const emailVal  = document.getElementById('emailVal');
const copyBtnText = document.getElementById('copyBtnText');

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
      if (copyBtnText) {
        copyBtnText.textContent = 'Copied!';
      }
      setTimeout(() => {
        if (copyBtnText) {
          copyBtnText.textContent = 'Copy';
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

// ==================== EmailJS Contact Form ====================
const contactForm      = document.getElementById('contactForm');
const submitBtn        = document.getElementById('contactSubmitBtn');
const submitBtnText    = document.getElementById('submitBtnText');
const submitBtnIcon    = document.getElementById('submitBtnIcon');
const submitBtnSpinner = document.getElementById('submitBtnSpinner');
const formStatus       = document.getElementById('formStatus');

function setFormLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtnText.textContent = isLoading ? 'Sending…' : 'Send Message';
  if (submitBtnIcon) {
    submitBtnIcon.hidden = isLoading;
  }
  if (submitBtnSpinner) {
    submitBtnSpinner.hidden = !isLoading;
  }
}

function showFormStatus(message, isError) {
  formStatus.textContent = message;
  formStatus.hidden = false;
  formStatus.className = 'form-status ' + (isError ? 'form-status-error' : 'form-status-success');
  setTimeout(() => {
    formStatus.hidden = true;
  }, 6000);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!window.emailjs) {
      showFormStatus('EmailJS failed to load. Please try refreshing the page.', true);
      return;
    }

    if (
      EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
      EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
      EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'
    ) {
      showFormStatus('EmailJS is not fully configured yet. Please set your credentials.', true);
      return;
    }

    setFormLoading(true);
    formStatus.hidden = true;

    try {
      await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm);
      showFormStatus('✓ Message sent! I\'ll get back to you soon.', false);
      contactForm.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      showFormStatus('Something went wrong. Try emailing me directly at zaskizaski13@gmail.com', true);
    } finally {
      setFormLoading(false);
    }
  });
}