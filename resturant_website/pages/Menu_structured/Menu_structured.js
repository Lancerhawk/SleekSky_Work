  /*------ Menu Page ------*/
  document.addEventListener('DOMContentLoaded', function() {
    // Get URL params for category filtering (for navbar dropdown)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFilter = urlParams.get('category');
    
    // Filter dishes by category from URL
    if (categoryFilter) {
      const dishCards = document.querySelectorAll('.menu-dish-card');
      let visibleCount = 0;
      
      dishCards.forEach(card => {
        const dishCategory = (card.dataset.category || '').toLowerCase();
        const isSpecial = card.dataset.special === 'true';
        
        let show = false;
        if (categoryFilter === 'specials' && isSpecial) {
          show = true;
        } else if (categoryFilter === 'desserts' && (dishCategory.includes('dessert') || dishCategory.includes('sweet'))) {
          show = true;
        } else if (categoryFilter === 'beverages' && (dishCategory.includes('beverage') || dishCategory.includes('drink') || dishCategory.includes('beverages'))) {
          show = true;
        }
        
        if (show) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      // Show empty state if no dishes match
      const emptyState = document.querySelector('.menu-empty-state');
      const dishesGrid = document.getElementById('menuDishesGrid');
      if (visibleCount === 0 && dishesGrid) {
        if (emptyState) {
          emptyState.style.display = 'block';
        } else {
          dishesGrid.innerHTML = '<div class="menu-empty-state"><svg class="menu-empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h2 class="menu-empty-state-title">No Dishes Found</h2><p class="menu-empty-state-message">We couldn\'t find any dishes in this category. Try selecting a different category.</p><a href="/menu" class="menu-empty-state-button">View All Dishes</a></div>';
        }
      } else if (emptyState) {
        emptyState.style.display = 'none';
      }
      
      // Update active tab if category tabs exist
      const categoryTabs = document.querySelectorAll('.menu-category-tab');
      categoryTabs.forEach(tab => {
        if (tab.dataset.category === categoryFilter) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
    
    // Search functionality
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const dishCards = document.querySelectorAll('.menu-dish-card');
        
        dishCards.forEach(card => {
          if (card.style.display === 'none') return; // Skip already hidden cards
          
          const dishName = card.querySelector('.menu-dish-name')?.textContent.toLowerCase() || '';
          const dishTagline = card.querySelector('.menu-dish-tagline')?.textContent.toLowerCase() || '';
          
          if (dishName.includes(searchTerm) || dishTagline.includes(searchTerm)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    }
    
    // Category tabs
    const categoryTabs = document.querySelectorAll('.menu-category-tab');
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category.toLowerCase();
        const dishCards = document.querySelectorAll('.menu-dish-card');
        let visibleCount = 0;
        
        dishCards.forEach(card => {
          if (category === 'all') {
            card.style.display = '';
            visibleCount++;
          } else {
            const dishCategory = (card.dataset.category || '').toLowerCase();
            const isSpecial = card.dataset.special === 'true';
            
            let show = false;
            if (category === 'specials' && isSpecial) {
              show = true;
            } else if (category === 'appetizers' && (dishCategory.includes('appetizer') || dishCategory === 'appetizers')) {
              show = true;
            } else if (category === 'soups-salads' && (dishCategory.includes('soup') || dishCategory.includes('salad') || dishCategory.includes('soups'))) {
              show = true;
            } else if (category === 'main-course' && (dishCategory.includes('main') || dishCategory.includes('course'))) {
              show = true;
            } else if (category === 'seafood' && dishCategory.includes('seafood')) {
              show = true;
            } else if (category === 'vegetarian' && dishCategory.includes('vegetarian')) {
              show = true;
            } else if (category === 'pasta-risotto' && (dishCategory.includes('pasta') || dishCategory.includes('risotto'))) {
              show = true;
            } else if (category === 'grills-bbq' && (dishCategory.includes('grill') || dishCategory.includes('bbq'))) {
              show = true;
            } else if (category === 'desserts' && (dishCategory.includes('dessert') || dishCategory === 'desserts')) {
              show = true;
            } else if (category === 'beverages' && (dishCategory.includes('beverage') || dishCategory.includes('drink'))) {
              show = true;
            } else if (category === 'cocktails' && dishCategory.includes('cocktail')) {
              show = true;
            } else if (category === 'wine' && dishCategory.includes('wine')) {
              show = true;
            } else if (category === 'kids-menu' && (dishCategory.includes('kids') || dishCategory.includes('kid'))) {
              show = true;
            } else if (dishCategory === category || dishCategory.includes(category) || category.includes(dishCategory)) {
              show = true;
            }
            
            if (show) {
              card.style.display = '';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          }
        });
        
        // Show/hide empty state
        updateEmptyState(visibleCount);
      });
    });
    
    // Dietary filters
    const dietaryFilters = document.querySelectorAll('#menuDietaryFilters .menu-dietary-filter');
    let activeDietaryFilters = [];
    
    dietaryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        this.classList.toggle('active');
        const dietaryValue = this.dataset.dietary;
        
        if (dietaryValue) {
          if (this.classList.contains('active')) {
            if (!activeDietaryFilters.includes(dietaryValue)) {
              activeDietaryFilters.push(dietaryValue);
            }
          } else {
            activeDietaryFilters = activeDietaryFilters.filter(f => f !== dietaryValue);
          }
        }
        
        applyFilters();
      });
    });
    
    // Allergen filters (exclude dishes with these allergens)
    const allergenFilters = document.querySelectorAll('#menuAllergenFilters .menu-dietary-filter');
    let activeAllergenFilters = [];
    
    allergenFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        this.classList.toggle('active');
        const allergenValue = this.dataset.allergen;
        
        if (allergenValue) {
          if (this.classList.contains('active')) {
            if (!activeAllergenFilters.includes(allergenValue)) {
              activeAllergenFilters.push(allergenValue);
            }
          } else {
            activeAllergenFilters = activeAllergenFilters.filter(f => f !== allergenValue);
          }
        }
        
        applyFilters();
      });
    });
    
    // Function to apply all filters
    function applyFilters() {
      const dishCards = document.querySelectorAll('.menu-dish-card');
      const activeCategoryTab = document.querySelector('.menu-category-tab.active');
      const category = activeCategoryTab ? activeCategoryTab.dataset.category.toLowerCase() : 'all';
      let visibleCount = 0;
      
      dishCards.forEach(card => {
        const dishCategory = (card.dataset.category || '').toLowerCase();
        const isSpecial = card.dataset.special === 'true';
        const dishDietary = (card.dataset.dietary || '').toLowerCase();
        const dishAllergens = (card.dataset.allergens || '').toLowerCase();
        
        // Category filter
        let categoryMatch = false;
        if (category === 'all') {
          categoryMatch = true;
        } else if (category === 'specials' && isSpecial) {
          categoryMatch = true;
        } else if (dishCategory === category || dishCategory.includes(category) || category.includes(dishCategory)) {
          categoryMatch = true;
        }
        
        // Dietary filter
        let dietaryMatch = true;
        if (activeDietaryFilters.length > 0) {
          dietaryMatch = activeDietaryFilters.some(filter => {
            return dishDietary.includes(filter) || dishDietary === filter;
          });
        }
        
        // Allergen filter (exclude dishes with selected allergens)
        let allergenMatch = true;
        if (activeAllergenFilters.length > 0) {
          allergenMatch = !activeAllergenFilters.some(allergen => {
            return dishAllergens.includes(allergen);
          });
        }
        
        if (categoryMatch && dietaryMatch && allergenMatch) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      updateEmptyState(visibleCount);
    }
    
    // Function to update empty state
    function updateEmptyState(visibleCount) {
      const emptyState = document.querySelector('.menu-empty-state');
      const dishesGrid = document.getElementById('menuDishesGrid');
      
      if (visibleCount === 0 && dishesGrid) {
        if (emptyState) {
          emptyState.style.display = 'block';
        } else {
          const emptyStateDiv = document.createElement('div');
          emptyStateDiv.className = 'menu-empty-state';
          emptyStateDiv.innerHTML = '<svg class="menu-empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h2 class="menu-empty-state-title">No Dishes Found</h2><p class="menu-empty-state-message">We couldn\'t find any dishes matching your filters. Try adjusting your search criteria.</p><a href="/menu" class="menu-empty-state-button">View All Dishes</a>';
          dishesGrid.parentNode.insertBefore(emptyStateDiv, dishesGrid);
        }
      } else if (emptyState) {
        emptyState.style.display = 'none';
      }
    }
  });
  /*------ Menu Page ------*/