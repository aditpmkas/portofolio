// === THEME TOGGLE ===
const themeToggle = document.getElementById("themeToggle");
const toggleBtn = document.getElementById("darkModeToggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.replace("dark-mode", "light-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  if (toggleBtn) toggleBtn.textContent = "🌙";
} else {
  body.classList.replace("light-mode", "dark-mode");
  if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  if (toggleBtn) toggleBtn.textContent = "☀️";
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");
    const isDark = body.classList.contains("dark-mode");
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

// === EMAILJS CONFIGURATION ===
// Initialize EmailJS
(function() {
  emailjs.init("Ct0RLuW-b4MfUuMNn"); // Your actual EmailJS public key
})();

// === FEEDBACK FORM ===
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = feedbackForm.querySelector('.submit-button');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in all fields.', 'error', feedbackForm);
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      return;
    }

    // EmailJS template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: 'Aditya Pamungkas',
      reply_to: email,
      current_date: new Date().toLocaleString('id-ID', { 
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    try {
      const response = await emailjs.send(
        'service_y0bl05j',    // Your EmailJS service ID
        'template_cy5qz1m',   // Your EmailJS template ID
        templateParams
      );

      if (response.status === 200) {
        showMessage('Message sent successfully!', 'success', feedbackForm);
        feedbackForm.reset();
      } else {
        showMessage('Failed to send message. Please try again.', 'error', feedbackForm);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      showMessage('Failed to send message. Please try again.', 'error', feedbackForm);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// === SHOW MESSAGE FUNCTION ===
function showMessage(message, type, form) {
  const existingMsg = form.querySelector('.message');
  if (existingMsg) existingMsg.remove();

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type} show`;
  messageDiv.textContent = message;
  form.insertBefore(messageDiv, form.firstChild);

  setTimeout(() => messageDiv.remove(), 5000);
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === FADE-IN ON SCROLL ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.project-card, .profile-card, .section-header');
  animateElements.forEach(el => observer.observe(el));
});
