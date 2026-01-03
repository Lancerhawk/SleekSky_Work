
  (function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });
    }
  })();

  (function() {
    const themeToggleEnabled = <%= item.dark_mode === true %>;
    
    function getTheme() {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'theme') {
          return value;
        }
      }
      return 'light';
    }
    
    function setTheme(theme) {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`; // 1 year
    }
    
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    function updateIcon(theme) {
      const toggleBtn = document.getElementById('theme-toggle-btn');
      if (!toggleBtn) return;
      
      const icon = toggleBtn.querySelector('svg');
      if (!icon) return;
      
      if (theme === 'dark') {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>';
      } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>';
      }
    }
    
    if (themeToggleEnabled) {
      const currentTheme = getTheme();
      applyTheme(currentTheme);
      
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
          updateIcon(currentTheme);
        });
      } else {
        updateIcon(currentTheme);
      }
    } else {
      applyTheme('light');
    }
    
    window.toggleTheme = function() {
      if (!themeToggleEnabled) return;
      
      const currentTheme = getTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      applyTheme(newTheme);
      updateIcon(newTheme);
    };
    
    window.updateThemeIcon = updateIcon;
  })();