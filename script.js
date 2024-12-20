
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




// products start 
let productsData = [];
const productsPerPage = 8; 
const shopProductsPerPage = 12; 
let currentPage = 1;


fetch('product.json')
  .then(response => response.json())
  .then(products => {
    productsData = products;
    if (window.location.pathname.includes("index.html")) {
      renderProducts(1, productsPerPage); // Home için ilk sayfa
    } else if (window.location.pathname.includes("shop.html")) {
      renderProducts(1, shopProductsPerPage); // Shop için ilk sayfa
      setupPagination(shopProductsPerPage);
    }
  })
  .catch(error => console.error('Error loading products:', error));

function renderProducts(page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const productsToDisplay = productsData.slice(startIndex, endIndex);

  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = '';

  productsToDisplay.forEach(product => {
    const productHTML = `
      <div class="productsCont">
        <div class="imgCont">
          <img src="${product.image}" alt="${product.name}" data-hover="${product.imageHover}">
          <img src="${product.imageHover}" alt="${product.name} Hover" class="hover-img">
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
}


function setupPagination(perPage) {
  const totalPages = Math.ceil(productsData.length / perPage);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';

  const prevButton = document.createElement('button');
  prevButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  prevButton.className = 'prev-btn';
  prevButton.style.display = currentPage === 1 ? 'none' : 'block';
  prevButton.onclick = (event) => {
    event.preventDefault(); 
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage, perPage);
      updatePaginationActiveButton();
      setupPagination(perPage); 

      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
  };
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = `pageBtn ${i === currentPage ? 'active' : ''}`;
    button.onclick = (event) => {
      event.preventDefault(); 
      currentPage = i;
      renderProducts(i, perPage);
      updatePaginationActiveButton();
      setupPagination(perPage); 

      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    };
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  nextButton.style.border = 'none';
  nextButton.className = 'next-btn';
  nextButton.style.display = currentPage === totalPages ? 'none' : 'block';
  nextButton.onclick = (event) => {
    event.preventDefault(); 
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage, perPage);
      updatePaginationActiveButton();
      setupPagination(perPage); 

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  paginationContainer.appendChild(nextButton);
}

function updatePaginationActiveButton() {
  const buttons = document.querySelectorAll('.pageBtn');
  buttons.forEach((btn, index) => {
    btn.classList.toggle('active', index + 1 === currentPage);
  });
}
