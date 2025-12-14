
    window.addEventListener('load', function() {
      const loader = document.getElementById('page-loader');
      if (loader) {
        setTimeout(function() {
          loader.classList.add('hidden');
          setTimeout(function() {
            loader.style.display = 'none';
          }, 300);
        }, 300);
      }
    });