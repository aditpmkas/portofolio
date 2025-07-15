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

// === INTERACTIVE ELEMENTS ===
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      
      // Animate skill bars
      if (entry.target.classList.contains('skills-section')) {
        animateSkillBars();
      }
      
      // Animate timeline items
      if (entry.target.classList.contains('timeline-item')) {
        entry.target.style.transitionDelay = entry.target.dataset.delay || '0ms';
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  // Observe sections
  document.querySelectorAll('.skills-section, .timeline-section, .projects-section, .about-section').forEach(section => {
    observer.observe(section);
  });
  
  // Observe timeline items
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.dataset.delay = `${index * 100}ms`;
    observer.observe(item);
  });
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.dataset.delay = `${index * 100}ms`;
    observer.observe(card);
  });
});

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute('data-width');
      bar.style.width = width + '%';
    }, index * 100);
  });
}

// Enhanced project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) rotateX(5deg)';
    this.style.boxShadow = '0 25px 80px var(--shadow)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) rotateX(0deg)';
    this.style.boxShadow = '0 10px 40px var(--shadow)';
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Typing animation for hero text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 500);
  }
});

// Interactive background particles
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
    position: fixed;
    width: 4px;
    height: 4px;
    background: linear-gradient(45deg, var(--primary), var(--secondary));
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    opacity: 0;
    animation: float 6s ease-in-out infinite;
  `;
  
  particle.style.left = Math.random() * window.innerWidth + 'px';
  particle.style.top = window.innerHeight + 'px';
  
  document.body.appendChild(particle);
  
  // Animate particle
  particle.style.opacity = '0.6';
  particle.style.transform = `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
  
  setTimeout(() => {
    particle.remove();
  }, 6000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Add CSS for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes float {
    0%, 100% { opacity: 0; transform: translateY(0) rotate(0deg); }
    50% { opacity: 0.6; transform: translateY(-50vh) rotate(180deg); }
  }
`;
document.head.appendChild(particleStyle);

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
