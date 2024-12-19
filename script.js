// dropdown start
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
// dropdown end


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




// seach clicked start
document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.querySelector(".search i");
  const searchContainer = document.createElement("div");
  searchContainer.classList.add("search-container");
  searchContainer.innerHTML = `
    <input type="text" placeholder="Axtarın...">
    <div class="close-btn">&times;</div>
  `;

  document.body.appendChild(searchContainer);

  const closeBtn = searchContainer.querySelector(".close-btn");
  searchBtn.addEventListener("click", () => {
    searchContainer.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    searchContainer.classList.remove("active");
  });
});
// seach clicked end




// search start
document.querySelector('.search').addEventListener('click', () => {
  document.body.classList.add('blur');
  document.querySelector('.search-container').classList.add('active');
});

document.querySelector('.search-container .close-btn').addEventListener('click', () => {
  document.body.classList.remove('blur');
  document.querySelector('.search-container').classList.remove('active');
});
// search end




//home prduct start 
fetch('product.json')
  .then(response => response.json())
  .then(products => {
    const productsContainer = document.getElementById('productsContainer');

    products.forEach(product => {
      const productHTML = `
        <div class="productsCont">
          <div class="imgCont">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              data-hover="${product.imageHover}" 
              data-default="${product.image}"
            >
            <img 
              src="${product.imageHover}" 
              alt="${product.name} Hover" 
              class="hover-img"
              data-hover="${product.imageHover}" 
              data-default="${product.image}" 
            >
          </div>
          <p class="productName">${product.name}</p>
          <p class="productPrice">${product.price}</p>
          <div>
            <a href="#" class="chooseOption">Choose Options</a>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productHTML;
    });
  })
  .catch(error => console.error('Error loading products:', error));
//home product end