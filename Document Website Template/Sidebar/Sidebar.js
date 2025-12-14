  (function() {
    let sidebarOpen = false;
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    
    window.openSidebar = function() {
      if (sidebar && sidebarOverlay && window.innerWidth < 1024) {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
        sidebarOpen = true;
        document.body.style.overflow = 'hidden';
        if (toggleBtn) {
          toggleBtn.style.display = 'none';
        }
      }
    };
    
    window.closeSidebar = function() {
      if (sidebar && sidebarOverlay && window.innerWidth < 1024) {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        sidebarOpen = false;
        document.body.style.overflow = '';
        if (toggleBtn) {
          toggleBtn.style.display = 'block';
        }
      }
    };
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function() {
        if (sidebarOpen) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    }
    
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024) {
        sidebar.classList.remove('-translate-x-full');
        sidebar.classList.add('lg:translate-x-0');
        sidebarOverlay.classList.add('hidden');
        sidebarOpen = false;
        document.body.style.overflow = '';
        if (toggleBtn) {
          toggleBtn.style.display = 'none';
        }
      } else {
        if (!sidebarOpen) {
          sidebar.classList.add('-translate-x-full');
          if (toggleBtn) {
            toggleBtn.style.display = 'block';
          }
        } else {
          if (toggleBtn) {
            toggleBtn.style.display = 'none';
          }
        }
      }
    });
    
    if (toggleBtn && window.innerWidth < 1024) {
      toggleBtn.style.display = 'block';
    } else if (toggleBtn) {
      toggleBtn.style.display = 'none';
    }
    
    const currentUrlPath = window.location.pathname;
    
    const sectionButtons = document.querySelectorAll('.sidebar-section-toggle');
    
    sectionButtons.forEach(function(button) {
      const sectionIndex = button.getAttribute('data-section');
      const subsectionsDiv = document.querySelector(`[data-subsections="${sectionIndex}"]`);
      const arrow = document.querySelector(`[data-arrow="${sectionIndex}"]`);
      
      if (!subsectionsDiv) return;
      
      let isActive = false;
      let shouldBeExpanded = false;
      
      const subsectionLinks = subsectionsDiv.querySelectorAll('a');
      const sectionLink = subsectionsDiv.querySelector('a:first-of-type'); // First link is the section link
      
      const normalizePath = function(path) {
        if (!path) return '';
        return path.replace(/\/$/, '') || '/';
      };
      
      const normalizedCurrentPath = normalizePath(currentUrlPath);
      
      if (sectionLink) {
        const sectionHref = normalizePath(sectionLink.getAttribute('href'));
        if (sectionHref === normalizedCurrentPath) {
          isActive = true;
          shouldBeExpanded = true;
          sectionLink.classList.add('active-link');
        }
      }
      
      subsectionLinks.forEach(function(link) {
        const linkHref = normalizePath(link.getAttribute('href'));
        if (linkHref === normalizedCurrentPath) {
          isActive = true;
          shouldBeExpanded = true;
          link.classList.add('active-link');
        }
      });
      
      const allSidebarLinks = document.querySelectorAll('.sidebar-link');
      allSidebarLinks.forEach(function(link) {
        const linkHref = normalizePath(link.getAttribute('href'));
        if (linkHref === normalizedCurrentPath) {
          link.classList.add('active-link');
        }
      });
      
      if (shouldBeExpanded) {
        const itemCount = subsectionLinks.length + (sectionLink ? 1 : 0);
        const targetHeight = itemCount * 50;
        
        if (subsectionsDiv.classList.contains('hidden')) {
          subsectionsDiv.classList.remove('hidden');
        }
        
        subsectionsDiv.style.maxHeight = '0';
        subsectionsDiv.style.opacity = '0';
        
        subsectionsDiv.offsetHeight;
        
        requestAnimationFrame(function() {
          subsectionsDiv.style.maxHeight = targetHeight + 'px';
          subsectionsDiv.style.opacity = '1';
        });
        
        if (arrow) {
          arrow.style.transform = 'rotate(180deg)';
        }
      }
      
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isHidden = subsectionsDiv.classList.contains('hidden');
        const sectionLink = subsectionsDiv.querySelector('a');
        const itemCount = subsectionLinks.length + (sectionLink ? 1 : 0);
        const targetHeight = itemCount * 50;
        
        if (isHidden) {
          subsectionsDiv.classList.remove('hidden');
          subsectionsDiv.offsetHeight;
          subsectionsDiv.style.maxHeight = targetHeight + 'px';
          subsectionsDiv.style.opacity = '1';
        } else {
          subsectionsDiv.style.maxHeight = '0';
          subsectionsDiv.style.opacity = '0';
          setTimeout(function() {
            if (subsectionsDiv.style.maxHeight === '0px') {
              subsectionsDiv.classList.add('hidden');
            }
          }, 300);
        }
        
        if (arrow) {
          const willBeHidden = !isHidden;
          arrow.style.transform = willBeHidden ? 'rotate(0deg)' : 'rotate(180deg)';
        }
      });
    });
    
    if (window.innerWidth < 1024) {
      document.querySelectorAll('#sidebar a').forEach(function(link) {
        link.addEventListener('click', function() {
          setTimeout(closeSidebar, 100);
        });
      });
    }
  })();