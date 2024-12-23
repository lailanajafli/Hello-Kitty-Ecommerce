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






// SEARCH START
// Arama butonuna tıklanınca modal'ı göster
document.querySelector(".search i").addEventListener("click", () => {
  modalOverlay.style.display = "block";
  searchContainer.style.display = "block";
});

// Modal'ı kapat (Close button ve modalOverlay tıklamasıyla)
const closeModal = () => {
  modalOverlay.style.display = "none";
  searchContainer.style.display = "none";
  searchResults.style.display = "none"; // Kapatıldığında arama sonuçlarını da gizle
  searchInput.value = ""; // Giriş alanını temizle
};

// Close button'a tıklama
closeBtn.addEventListener("click", closeModal);

// Kenara tıklama (modalOverlay)
modalOverlay.addEventListener("click", (event) => {
  // Eğer kullanıcı `modalOverlay`'e tıklarsa, modal kapatılsın
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Arama yapılırken filtreleme
searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  if (query.trim() === "") {
    // Eğer giriş alanı boşsa arama sonuçlarını gizle
    searchResults.style.display = "none";
  } else {
    // Giriş alanı doluysa arama sonuçlarını göster
    searchResults.style.display = "block";

    // Ürünleri filtrele
    const filteredProducts = productsData.filter((product) => {
      return product.name.toLowerCase().includes(query);
    });

    // Sonuçları görüntüle
    displaySearchResults(filteredProducts);
  }
});

// Arama sonuçlarını görüntüle
function displaySearchResults(filteredProducts) {
  searchResults.innerHTML = ""; // Önceki sonuçları temizle

  const query = searchInput.value.toLowerCase(); // Mevcut arama sorgusunu al

  if (filteredProducts.length === 0) {
    // Eğer sonuç yoksa kullanıcıya arama sorgusunu göster
    searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
  } else {
    // Sonuçları döngüyle ekle
    filteredProducts.forEach((product) => {
      const resultCont = `
        <div class="searchResultItem">
          <div class="searchResultImage">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <p class="searchResultName">${product.name}</p>
        </div>
      `;
      searchResults.innerHTML += resultCont;
    });
  }
}
// SEARCH END








// products start
const productsPerPage = 8;
let currentPage = 1;
let productsData = [];

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
            <a href="detail.html?id=${product.id}">
              <img src="${product.image}" alt="${product.name}">
              <img src="${product.imageHover}" alt="${product.name} Hover" class="hover-img">
            </a>
          </div>
          <p class="productName">${product.name}</p>
          <p class="productPrice">${formatPrice(product.price)}</p>
          <div>
            <a href="detail.html?id=${product.id}" class="chooseOption">Choose Options</a>
          </div>
        </div>
    `;
    productsContainer.innerHTML += productHTML;
  });
  function formatPrice(price) {
    return `$${price.toFixed(2)}`;
  }
  updateProductCount(productsToDisplay.length);
}




// balaca sekillere tiklanma start


// Main image öğesini seç
const mainImage = document.querySelector(".mainImage");

// Thumbnail container içindeki tüm thumbCont öğelerini seç
const thumbnails = document.querySelectorAll(".thumbCont");

// Her bir thumbCont'e tıklama olayı ekle
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    
    // thumb içindeki img öğesini al
    const thumbnailImage = thumb.querySelector(".thumbnail");
    // mainImage'in src'sini güncelle
    mainImage.src = thumbnailImage.src;
  });
});





// balaca sekillere tiklanma end



// detail start

let productId = new URLSearchParams(window.location.search).get("id");

fetch("product.json")
  .then((response) => response.json())
  .then((products) => {
    const product = products.find((item) => item.id == productId);

    if (product) {
      // Ana görüntüyü ayarla
      document.querySelector(".mainImage").src = product.image;
      // Ürün adını ve fiyatını ayarla
      document.querySelector(".productTitle").textContent = product.name;
      document.querySelector(".productPrice").textContent = `€${product.price} EUR`;

      // Thumbnail container'ı seç
      const thumbnailContainer = document.querySelector(".thumbnailContainer");

      // Thumbnails eklemek için images dizisini döngüyle oluştur
      product.images.forEach((imgSrc) => {
        const thumbCont = document.createElement("div");
        thumbCont.className = "thumbCont";

        const img = document.createElement("img");
        img.className = "thumbnail";
        img.src = imgSrc;
        img.alt = product.name;

        thumbCont.appendChild(img);
        thumbnailContainer.appendChild(thumbCont);

        // Tıklanan küçük resmi ana görüntüye yansıt
        thumbCont.addEventListener("click", () => {
          document.querySelector(".mainImage").src = imgSrc;
        });
      });
    } else {
      document.querySelector(".mainContainer").innerHTML = "<p>Product not found</p>";
    }
  });




// detail end






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


































