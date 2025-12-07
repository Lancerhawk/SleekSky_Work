
  document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('mainNavbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOpenIcon = document.querySelector('.menu-open');
  const menuCloseIcon = document.querySelector('.menu-close');
  
  // Get navbar settings from data attributes
  const bgColor = navbar.dataset.bgColor;
  const textColor = navbar.dataset.textColor;
  const isTransparent = navbar.dataset.transparent === 'true';
  
  // Set CSS variables
  navbar.style.setProperty('--navbar-bg-color', bgColor);
  navbar.style.setProperty('--navbar-text-color', textColor);
  
  // Sticky navbar on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
      if (isTransparent) {
        navbar.classList.add('transparent-hero');
      }
    } else {
      navbar.classList.remove('scrolled');
      if (isTransparent) {
        navbar.classList.remove('transparent-hero');
        navbar.style.backgroundColor = 'transparent';
      }
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle - with touch support
  if (mobileMenuBtn && mobileMenu) {
    // Multiple event types for better compatibility
    ['click', 'touchend'].forEach(eventType => {
      mobileMenuBtn.addEventListener(eventType, function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const isHidden = mobileMenu.classList.contains('mobile-menu-hidden');
        
        if (isHidden) {
          mobileMenu.classList.remove('mobile-menu-hidden');
          mobileMenu.classList.add('mobile-menu-visible');
          if (menuOpenIcon) menuOpenIcon.classList.add('hidden');
          if (menuCloseIcon) menuCloseIcon.classList.remove('hidden');
        } else {
          mobileMenu.classList.add('mobile-menu-hidden');
          mobileMenu.classList.remove('mobile-menu-visible');
          if (menuOpenIcon) menuOpenIcon.classList.remove('hidden');
          if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
        }
      }, { passive: false });
    });
  }
  
  // Desktop dropdown - hover and click support
  const dropdownContainers = document.querySelectorAll('.dropdown-container');
  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.dropdown-trigger');
    const menu = container.querySelector('.dropdown-menu');
    const icon = container.querySelector('.dropdown-icon');
    
    if (trigger && menu) {
      // Hover support (desktop)
      container.addEventListener('mouseenter', function() {
        container.classList.add('dropdown-open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      });
      
      container.addEventListener('mouseleave', function() {
        container.classList.remove('dropdown-open');
        if (icon) icon.style.transform = 'rotate(0deg)';
      });
      
      // Click support (touch devices)
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = container.classList.contains('dropdown-open');
        
        // Close all other dropdowns
        dropdownContainers.forEach(other => {
          if (other !== container) {
            other.classList.remove('dropdown-open');
            const otherIcon = other.querySelector('.dropdown-icon');
            if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
          }
        });
        
        // Toggle current dropdown
        if (isOpen) {
          container.classList.remove('dropdown-open');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          container.classList.add('dropdown-open');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-container')) {
      dropdownContainers.forEach(container => {
        container.classList.remove('dropdown-open');
        const icon = container.querySelector('.dropdown-icon');
        if (icon) icon.style.transform = 'rotate(0deg)';
      });
    }
  });
  
  // Mobile dropdown toggle - with touch support
  const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
  mobileDropdownTriggers.forEach(trigger => {
    ['click', 'touchend'].forEach(eventType => {
      trigger.addEventListener(eventType, function(e) {
        e.stopPropagation();
        const content = this.nextElementSibling;
        const icon = this.querySelector('.mobile-dropdown-icon');
        
        if (content) {
          content.classList.toggle('open');
        }
        if (icon) {
          icon.classList.toggle('rotated');
        }
      }, { passive: false });
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileMenu && !navbar.contains(e.target) && !mobileMenu.classList.contains('mobile-menu-hidden')) {
      mobileMenu.classList.add('mobile-menu-hidden');
      mobileMenu.classList.remove('mobile-menu-visible');
      if (menuOpenIcon) menuOpenIcon.classList.remove('hidden');
      if (menuCloseIcon) menuCloseIcon.classList.add('hidden');
    }
  });
  
  // Set active link based on current page
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/')) {
      link.classList.add('active');
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-container')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
      });
    }
  });
});