  document.addEventListener('DOMContentLoaded', function() {
  
  // Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      // Validate email
      if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      `;
      
      // Simulate API call (replace with actual newsletter signup logic)
      setTimeout(() => {
        showNotification('Thank you for subscribing!', 'success');
        emailInput.value = '';
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }, 1500);
    });
  }
  
  // Email Validation
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  // Notification System
  function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.footer-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `footer-notification fixed bottom-8 right-8 px-6 py-4 rounded-lg shadow-2xl transform translate-x-0 transition-all duration-300 z-50 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white flex items-center space-x-3`;
    
    notification.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${type === 'success' 
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
        }
      </svg>
      <span class="font-medium">${message}</span>
      <button class="ml-4 text-white hover:text-gray-200 transition-colors" onclick="this.parentElement.remove()">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Smooth Scroll for Footer Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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
  
  // Social Media Link Analytics (optional)
  document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const platform = this.getAttribute('href');
      console.log('Social media click:', platform);
      // Add your analytics tracking here if needed
    });
  });
  
  // Footer Link Tracking (optional)
  document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', function() {
      const linkText = this.textContent.trim();
      console.log('Footer link clicked:', linkText);
      // Add your analytics tracking here if needed
    });
  });
  
  
  // Back to Top functionality (if you want to add a back-to-top button)
  const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.className = 'fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transform transition-all duration-300 opacity-0 invisible z-40';
    button.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    `;
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      } else {
        button.style.opacity = '0';
        button.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };
  
  // Uncomment the line below if you want to add a back-to-top button
  // createBackToTopButton();
  
  // Current Year Update (for copyright)
  const currentYearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  currentYearElements.forEach(el => {
    el.textContent = currentYear;
  });
  
  // Phone number click tracking
  document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
    phoneLink.addEventListener('click', function() {
      console.log('Phone number clicked:', this.getAttribute('href'));
      // Add your analytics tracking here if needed
    });
  });
  
  // Email link click tracking
  document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', function() {
      console.log('Email link clicked:', this.getAttribute('href'));
      // Add your analytics tracking here if needed
    });
  });
  
});