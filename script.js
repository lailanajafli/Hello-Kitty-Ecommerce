
const dropdowns = document.querySelectorAll('.userItem.dropdown');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', function() {
    dropdown.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      const dropdown = this.closest('.dropdown');
      dropdown.classList.toggle('active');
      const allDropdowns = document.querySelectorAll('.dropdown');
      allDropdowns.forEach(item => {
        if (item !== dropdown) {
          item.classList.remove('active');
        }
      });
      event.preventDefault();
    });
  });

  document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target) && !event.target.matches('.dropdown-toggle')) {
        dropdown.classList.remove('active');
      }
    });
  });

  const currencyItems = document.querySelectorAll('.customValyuta .dropdown-item');
  currencyItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedCurrency = this.getAttribute('data-currency');
      document.getElementById('selectedCurrency').textContent = selectedCurrency;
      this.closest('.dropdown').classList.remove('active'); 
    });
  });

  const languageItems = document.querySelectorAll('.customLang .dropdown-item');
  languageItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedLanguage = this.querySelector('span').textContent; 
      document.getElementById('selectedLanguage').textContent = selectedLanguage; 
      this.closest('.dropdown').classList.remove('active'); 
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');
  
  if (burgerMenu) {
      burgerMenu.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          burgerMenu.classList.toggle('active');
      });
  }
});


// slider start
document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");
  const sliderContent = document.querySelector(".slider-content");
  const testimonials = document.querySelectorAll(".testimonial");
  const dotsContainer = document.querySelector(".dots");

  let currentIndex = 0;

  testimonials.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);

    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  function updateSlider() {
    const offset = -currentIndex * 100;
    sliderContent.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      updateSlider();
    });
  } else {
    console.error("Next düyməsi tapılmadı!");
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      updateSlider();
    });
  } else {
    console.error("Prev düyməsi tapılmadı!");
  }

  updateSlider();
});

// slider end