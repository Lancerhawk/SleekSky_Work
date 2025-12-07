/*------ hero section ------*/
document.addEventListener('DOMContentLoaded', function() {
  
  // Parallax Effect for Hero Background
  const heroSection = document.querySelector('section');
  const heroBackground = document.querySelector('.absolute.inset-0.z-0 img');
  
  if (heroBackground) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // Smooth Scroll for Scroll Indicator - Fixed
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    });
  }
  
  // Welcome Section Scroll Animation
  const welcomeText = document.querySelector('.welcome-text');
  
  if (welcomeText) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    observer.observe(welcomeText);
  }
  
  // CTA Button Ripple Effect
  const ctaButton = document.querySelector('.hero-cta');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  }
  
});
/*------ hero section ------*/