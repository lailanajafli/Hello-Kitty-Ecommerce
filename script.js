// dropdown start
const dropdowns = document.querySelectorAll(".userItem.dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", function () {
    dropdown.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      const dropdown = this.closest(".dropdown");
      dropdown.classList.toggle("active");
      const allDropdowns = document.querySelectorAll(".dropdown");
      allDropdowns.forEach((item) => {
        if (item !== dropdown) {
          item.classList.remove("active");
        }
      });
      event.preventDefault();
    });
  });

  document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      if (
        !dropdown.contains(event.target) &&
        !event.target.matches(".dropdown-toggle")
      ) {
        dropdown.classList.remove("active");
      }
    });
  });

  const currencyItems = document.querySelectorAll(
    ".customValyuta .dropdown-item"
  );
  currencyItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedCurrency = this.getAttribute("data-currency");
      document.getElementById("selectedCurrency").textContent =
        selectedCurrency;
      this.closest(".dropdown").classList.remove("active");
    });
  });

  const languageItems = document.querySelectorAll(".customLang .dropdown-item");
  languageItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedLanguage = this.querySelector("span").textContent;
      document.getElementById("selectedLanguage").textContent =
        selectedLanguage;
      this.closest(".dropdown").classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const burgerMenu = document.getElementById("burger-menu");
  const navLinks = document.getElementById("nav-links");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      burgerMenu.classList.toggle("active");
    });
  }
});
// dropdown end


// Dropdown menülerini açma ve kapama işlevi
document.addEventListener('DOMContentLoaded', function () {
  // Tüm dropdown menüleri al
  const dropdownToggles = document.querySelectorAll('.dropdownToggleAvaila, .dropdownTogglePrice, .dropdownToggleFeatur');

  // Her dropdown menüsü için işlem yap
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener('click', function (event) {
      const dropdownMenu = this.nextElementSibling; // Açılacak menü

      // Tüm menüleri kapat
      const allDropdowns = document.querySelectorAll('.dropdownMenuAvaila, .dropdownMenuPrice, .dropdownMenuFeatur');
      allDropdowns.forEach(function (menu) {
        if (menu !== dropdownMenu) {
          menu.style.display = 'none';
        }
      });

      // Tıklanan menüyü aç/kapat
      if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
      } else {
        dropdownMenu.style.display = 'block';
      }
    });
  });

  // Dışarıya tıklanırsa, menüyü kapatma
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.dropdownAvaila, .dropdownPrice, .dropdownFeatur')) {
      const allDropdowns = document.querySelectorAll('.dropdownMenuAvaila, .dropdownMenuPrice, .dropdownMenuFeatur');
      allDropdowns.forEach(function (menu) {
        menu.style.display = 'none';
      });
    }
  });
});















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
// document.querySelector(".search").addEventListener("click", () => {
//   document.body.classList.add("blur");
//   document.querySelector(".search-container").classList.add("active");
// });

// document
//   .querySelector(".search-container .close-btn")
//   .addEventListener("click", () => {
//     document.body.classList.remove("blur");
//     document.querySelector(".search-container").classList.remove("active");
//   });
// search end

// products start
// products start
let productsData = [];
const productsPerPage = 8;
let currentPage = 1;

fetch("product.json")
  .then((response) => response.json())
  .then((products) => {
    productsData = products;

    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    if (currentPath === "index.html") {
      renderProducts(1, productsPerPage);
    } else if (currentPath === "shop.html") {
      renderProducts(1, productsPerPage);
      setupPagination(productsPerPage);
    }
  })
  .catch((error) => console.error("Error loading products:", error));

// Fiyat formatlama fonksiyonu
function formatPrice(price) {
  const numericPrice = parseFloat(price); // Fiyatı sayıya dönüştür
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return "Fiyat geçersiz"; // Geçerli fiyat değilse, 'Fiyat geçersiz' döndür
  }
  return `€${numericPrice.toFixed(2)} EUR`; // Fiyatı düzgün bir şekilde göster
}

// Ürünleri render etme fonksiyonu
function renderProducts(page, perPage, filteredProducts = null) {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) {
    console.error("productsContainer not found");
    return;
  }

  const productsToDisplay = filteredProducts || productsData;

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const productsForPage = productsToDisplay.slice(startIndex, endIndex);

  productsContainer.innerHTML = "";

  productsForPage.forEach((product) => {
    const productHTML = `
      <div class="productsCont">
        <div class="imgCont">
          <img src="${product.image}" alt="${product.name}">
          <img src="${product.imageHover}" alt="${product.name} Hover" class="hover-img">
        </div>
        <p class="productName">${product.name}</p>
        <p class="productPrice">${formatPrice(product.price)}</p>
        <div>
          <a href="#" class="chooseOption">Choose Options</a>
        </div>
      </div>
    `;
    productsContainer.innerHTML += productHTML;
  });

  updateProductCount(productsToDisplay.length);
}

// Ürün sayısını güncelleme fonksiyonu
function updateProductCount(count) {
  const productsCountElement = document.getElementById("productsCount");
  if (productsCountElement) {
    productsCountElement.textContent = `${count}`;
  }
}

// Sayfalama fonksiyonu
function setupPagination(perPage) {
  const totalPages = Math.ceil(productsData.length / perPage);
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = "";

  const prevButton = document.createElement("button");
  prevButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  prevButton.className = "prev-btn";
  prevButton.style.display = currentPage === 1 ? "none" : "block";
  prevButton.onclick = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderProducts(currentPage, perPage);
      updatePaginationActiveButton();
      setupPagination(perPage);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = `pageBtn ${i === currentPage ? "active" : ""}`;
    button.onclick = (event) => {
      event.preventDefault();
      showPage(i);
    };
    paginationContainer.appendChild(button);
  }

  const nextButton = document.createElement("button");
  nextButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  nextButton.style.border = "none";
  nextButton.className = "next-btn";
  nextButton.style.display = currentPage === totalPages ? "none" : "block";
  nextButton.onclick = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts(currentPage, perPage);
      updatePaginationActiveButton();
      setupPagination(perPage);

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  paginationContainer.appendChild(nextButton);
}

// Sayfa aktiflik durumunu güncelleme fonksiyonu
function updatePaginationActiveButton() {
  const buttons = document.querySelectorAll(".pageBtn");
  buttons.forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentPage);
  });
}

// Sayfa gösterme fonksiyonu
function showPage(pageNumber) {
  currentPage = pageNumber;
  renderProducts(currentPage, productsPerPage);
  updatePaginationActiveButton();
}

// Fiyat aralığı filtreleme fonksiyonu
function filterByPrice(minPrice, maxPrice) {
  const filteredProducts = productsData.filter((product) => {
    const price = parseFloat(product.price);
    return !isNaN(price) && price >= minPrice && price <= maxPrice;
  });
  renderProducts(1, productsPerPage, filteredProducts);
  setupPagination(productsPerPage);
}

// Fiyat aralığı inputlarını dinle
document.getElementById("minPrice").addEventListener("input", filterProductsByPrice);
document.getElementById("maxPrice").addEventListener("input", filterProductsByPrice);

// Fiyat aralığına göre filtreleme
function filterProductsByPrice() {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  filterByPrice(minPrice, maxPrice);
}

// Fiyat sıfırlama işlevi
function resetPriceFilter() {
  document.getElementById("minPrice").value = '';
  document.getElementById("maxPrice").value = '';
  renderProducts(1, productsPerPage);
  setupPagination(productsPerPage);
}

// Reset butonuna tıklama olayını ekleyelim
document.getElementById("resetPriceBtn").addEventListener("click", resetPriceFilter);

// Sıralama işlemi
function sortProducts(sortOption) {
  let sortedProducts;
  switch (sortOption) {
    case "alphabeticalAZ":
      sortedProducts = [...productsData].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabeticalZA":
      sortedProducts = [...productsData].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "priceLowToHigh":
      sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
      break;
    case "priceHighToLow":
      sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
      break;
    case "dateOldToNew":
      sortedProducts = [...productsData].sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "dateNewToOld":
      sortedProducts = [...productsData].sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    default:
      sortedProducts = productsData;
  }

  renderProducts(1, productsPerPage, sortedProducts); // Sorted products render
}

// Dropdown menü itemlarına tıklama işlevselliği
const dropdownItems = document.querySelectorAll(".dropdownItem");
dropdownItems.forEach(item => {
  item.addEventListener("click", (event) => {
    const sortOption = event.target.closest("li").dataset.sort;
    document.getElementById("selectedFeatur").textContent = event.target.textContent;
    sortProducts(sortOption);
  });
});

// Sayfa yüklendiğinde tüm ürünleri render et
renderProducts(1, productsPerPage);


































