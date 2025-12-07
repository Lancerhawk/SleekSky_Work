/*------ Individual Dish Page ------*/
  document.addEventListener('DOMContentLoaded', function() {
    // Gallery functionality
    const galleryImages = document.querySelectorAll('.dish-gallery-image');
    const galleryThumbnails = document.querySelectorAll('.dish-gallery-thumbnail');
    const prevBtn = document.getElementById('dishGalleryPrev');
    const nextBtn = document.getElementById('dishGalleryNext');
    const counter = document.getElementById('dishImageCounter');
    let currentIndex = 0;
    
    function showImage(index) {
      galleryImages.forEach((img, i) => {
        if (i === index) {
          img.classList.remove('opacity-0', 'absolute');
          img.classList.add('opacity-100');
        } else {
          img.classList.add('opacity-0', 'absolute');
          img.classList.remove('opacity-100');
        }
      });
      
      galleryThumbnails.forEach((thumb, i) => {
        if (i === index) {
          thumb.classList.add('active');
        } else {
          thumb.classList.remove('active');
        }
      });
      
      if (counter) {
        counter.textContent = index + 1;
      }
      
      currentIndex = index;
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        showImage(newIndex);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        showImage(newIndex);
      });
    }
    
    galleryThumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', function() {
        showImage(index);
      });
    });
  });
  /*------ Individual Dish Page ------*/