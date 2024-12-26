const { pathname } = document.location;
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
document.addEventListener("DOMContentLoaded", function () {
  // Tüm dropdown menüleri al
  const dropdownToggles = document.querySelectorAll(
    ".dropdownToggleAvaila, .dropdownTogglePrice, .dropdownToggleFeatur"
  );

  // Her dropdown menüsü için işlem yap
  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
      const dropdownMenu = this.nextElementSibling; // Açılacak menü

      // Tüm menüleri kapat
      const allDropdowns = document.querySelectorAll(
        ".dropdownMenuAvaila, .dropdownMenuPrice, .dropdownMenuFeatur"
      );
      allDropdowns.forEach(function (menu) {
        if (menu !== dropdownMenu) {
          menu.style.display = "none";
        }
      });

      // Tıklanan menüyü aç/kapat
      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
      }
    });
  });

  // Dışarıya tıklanırsa, menüyü kapatma
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".dropdownAvaila, .dropdownPrice, .dropdownFeatur")
    ) {
      const allDropdowns = document.querySelectorAll(
        ".dropdownMenuAvaila, .dropdownMenuPrice, .dropdownMenuFeatur"
      );
      allDropdowns.forEach(function (menu) {
        menu.style.display = "none";
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

if (!pathname.includes("checkout")) {
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

  // header scroll start

  let lastScrollY = 0; // Əvvəlki scroll mövqeyi
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Aşağıya scroll zamanı header gizlənir
      header.classList.add("hidden");
    } else {
      // Yuxarıya scroll zamanı header görünür
      header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY; // Mövqeyi yenilə
  });
  // header scroll end
}

// Arama sonuçlarını görüntüle
function displaySearchResults(filteredProducts) {
  searchResults.innerHTML = ""; // Önceki sonuçları temizle

  const query = searchInput.value.toLowerCase(); // Mevcut arama sorgusunu al

  if (filteredProducts.length === 0) {
    // Eğer sonuç yoksa kullanıcıya arama sorgusunu göster
    searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
  } else {
    // Sonuçları döngüyle ekle
// Sonuçları döngüyle ekle
filteredProducts.forEach((product) => {
  const resultCont = document.createElement("div");
  resultCont.classList.add("searchResultItem");
  resultCont.innerHTML = `
    <div class="searchResultImage">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <p class="searchResultName">${product.name}</p>
  `;

  // Tıklama olayını ekle
  resultCont.addEventListener("click", () => {
    // Detay sayfasına yönlendirme
    window.location.href = `details.html?id=${product.id}`;
  });

  // Oluşturulan öğeyi arama sonuçlarına ekle
  searchResults.appendChild(resultCont);
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
              <img src="${product.imageHover}" alt="${
      product.name
    } Hover" class="hover-img">
            </a>
          </div>
          <p class="productName">${product.name}</p>
          <p class="productPrice">${formatPrice(product.price)}</p>
          <div>
            <a class="chooseOption" data-product-id="${
              product.id
            }">Choose Options</a>
          </div>
        </div>
    `;
    productsContainer.innerHTML += productHTML;
  });
  function formatPrice(price) {
    return `€${price.toFixed(2)} EUR`;
  }
  updateProductCount(productsToDisplay.length);
}
// products start

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".closeBtn");
  const closeCartBtn = document.querySelector(".closeCartModal");
  const productTitle = document.querySelector(".productTitle");
  const productPrice = document.querySelector(".productPrice");
  const mainImageCart = document.getElementById("mainImageCart");
  const cartCount = document.querySelector(".cartCount");
  const cartModal = document.getElementById("cartModal");
  const cartModalContent = document.querySelector(".cartProductList");
  const totalItemsCount = document.querySelector(".totalItemsCount"); // Toplam ürün sayısını gösterecek alan

  let count = 0; // Sepet sayacı
  let cartItems = []; // Sepetteki ürünler


  fetch("product.json")
    .then((response) => response.json())
    .then((products) => {
      document.addEventListener("click", (event) => {
        // Ürün detay modali
        if (event.target.classList.contains("chooseOption")) {
          event.preventDefault();
          const productId = event.target.dataset.productId;
          const product = products.find((item) => item.id == productId);

          if (product) {
            mainImageCart.src = product.image;
            productTitle.textContent = product.name;
            productPrice.textContent = `€${product.price.toFixed(2)}`;
            modal.style.display = "flex";
            attachModalEventListeners(modal, product); // Dinamik bağlama
          } else {
            console.error("Mehsul tapilmadi. ID:", productId);
          }
        }

        // Sepete ekleme işlemi
        if (event.target.classList.contains("addToCartButton")) {
          event.preventDefault();
          count++;
          cartCount.textContent = count;
          cartCount.style.display = "flex";

          const productInCart = {
            id: mainImageCart.src,
            name: productTitle.textContent,
            price: parseFloat(productPrice.textContent.replace("€", "")),
            quantity: parseInt(modal.querySelector(".quantityInput").textContent), // Dinamik miktar
          };

          const existingProduct = cartItems.find((item) => item.id === productInCart.id);
          if (existingProduct) {
            existingProduct.quantity += productInCart.quantity;
          } else {
            cartItems.push(productInCart);
          }

          modal.style.display = "none";
          updateCartModal();
          cartModal.style.display = "flex";
        }
      });

      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      if (closeCartBtn) {
        closeCartBtn.addEventListener("click", () => {
          cartModal.style.display = "none";
        });
      }

      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
        if (event.target === cartModal) {
          cartModal.style.display = "none";
        }
      });
    })
    .catch((error) => console.error("JSON yükleme hatası:", error));

  function updateCartModal() {
    cartModalContent.innerHTML = "";

    let totalItems = 0; // Toplam ürün sayacı

    cartItems.forEach((item) => {
      totalItems += item.quantity; // Toplam ürüne miktarını ekle

      const cartItem = document.createElement("div");
      cartItem.classList.add("cartProduct");
      cartItem.innerHTML = `
        <img src="${item.id}" alt="${item.name}" class="cartImage">
        <div>
          <h3>${item.name}</h3>
          <p>€${(item.price * item.quantity).toFixed(2)} (€${item.price.toFixed(2)} x ${item.quantity})</p>
        </div>
      `;
      cartModalContent.appendChild(cartItem);
    });

    // Toplam ürün sayısını güncelle
    totalItemsCount.textContent = `View cart: ${totalItems}`;
  }

  function attachModalEventListeners(modalElement, product) {
    const increaseBtn = modalElement.querySelector(".quantityIncrease");
    const decreaseBtn = modalElement.querySelector(".quantityDecrease");
    const quantityInput = modalElement.querySelector(".quantityInput");

    if (!increaseBtn || !decreaseBtn || !quantityInput) {
      console.error("Artırma/Azaltma elementleri bulunamadı.");
      return;
    }

    let quantity = 1; // Varsayılan miktar
    quantityInput.textContent = quantity;

    // Artırma butonu
    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityInput.textContent = quantity;
    });

    // Azaltma butonu
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityInput.textContent = quantity;
      }
    });
  }
});

// URL'den ürün ID'sini al ve detayları yükle
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

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
    }
  })
  .catch((error) => console.error("JSON yükleme hatası:", error));


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

// Fiyat aralığına göre filtreleme
function filterProductsByPrice() {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;
  filterByPrice(minPrice, maxPrice);
}

if (pathname.includes("shop")) {
  // Fiyat aralığı inputlarını dinle
  document
    .getElementById("minPrice")
    .addEventListener("input", filterProductsByPrice);
  document
    .getElementById("maxPrice")
    .addEventListener("input", filterProductsByPrice);
  document
    .getElementById("resetPriceBtn")
    .addEventListener("click", resetPriceFilter);
}

// Fiyat sıfırlama işlevi
function resetPriceFilter() {
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  renderProducts(1, productsPerPage);
  setupPagination(productsPerPage);
}

// Reset butonuna tıklama olayını ekleyelim

// Sıralama işlemi
function sortProducts(sortOption) {
  let sortedProducts;
  switch (sortOption) {
    case "alphabeticalAZ":
      sortedProducts = [...productsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    case "alphabeticalZA":
      sortedProducts = [...productsData].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      break;
    case "priceLowToHigh":
      sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
      break;
    case "priceHighToLow":
      sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
      break;
    case "dateOldToNew":
      sortedProducts = [...productsData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      break;
    case "dateNewToOld":
      sortedProducts = [...productsData].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      break;
    default:
      sortedProducts = productsData;
  }

  renderProducts(1, productsPerPage, sortedProducts); // Sorted products render
}

// Dropdown menü itemlarına tıklama işlevselliği
const dropdownItems = document.querySelectorAll(".dropdownItem");
dropdownItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const sortOption = event.target.closest("li").dataset.sort;
    document.getElementById("selectedFeatur").textContent =
      event.target.textContent;
    sortProducts(sortOption);
  });
});

// Sayfa yüklendiğinde tüm ürünleri render et
renderProducts(1, productsPerPage);






// checkout validation start
if (window.location.pathname.includes("checkout")) {
  const form = document.querySelector(".checkoutForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Formun gönderilmesini engelle

      // Önceki hata mesajlarını temizle
      const errorMessages = document.querySelectorAll(".errorMessage");
      errorMessages.forEach((message) => (message.textContent = ""));

      // Önceki hata sınıflarını temizle
      const errorInputs = document.querySelectorAll(".error");
      errorInputs.forEach((input) => input.classList.remove("error"));

      let isValid = true;

      // Contact Section doğrulaması
      const emailOrPhone = document.getElementById("emailOrPhone");
      const emailError = document.getElementById("emailError");
      if (!emailOrPhone.value) {
        emailError.textContent = "This field is required";
        emailOrPhone.classList.add("error");
        isValid = false;
      } else if (!validateEmailOrPhone(emailOrPhone.value)) {
        emailError.textContent = "Please enter a valid email or phone number";
        emailOrPhone.classList.add("error");
        isValid = false;
      }

      // Delivery Section doğrulaması
      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const address = document.getElementById("address");
      const postalCode = document.getElementById("postalCode");
      const city = document.getElementById("city");
      const phone = document.getElementById("phone");
      if (!firstName.value) {
        document.getElementById("firstNameError").textContent = "This field is required";
        firstName.classList.add("error");
        isValid = false;
      }
      if (!lastName.value) {
        document.getElementById("lastNameError").textContent = "This field is required";
        lastName.classList.add("error");
        isValid = false;
      }
      if (!address.value) {
        document.getElementById("addressError").textContent = "This field is required";
        address.classList.add("error");
        isValid = false;
      }
      if (!postalCode.value) {
        document.getElementById("postalCodeError").textContent = "This field is required";
        postalCode.classList.add("error");
        isValid = false;
      }
      if (!city.value) {
        document.getElementById("cityError").textContent = "This field is required";
        city.classList.add("error");
        isValid = false;
      }
      if (!phone.value || !validatePhone(phone.value)) {
        document.getElementById("phoneError").textContent = "Please enter a valid phone number";
        phone.classList.add("error");
        isValid = false;
      }

      // Payment Section doğrulaması
      const cardNumber = document.getElementById("cardNumber");
      const expirationDate = document.getElementById("expirationDate");
      const securityCode = document.getElementById("securityCode");
      const nameOnCard = document.getElementById("nameOnCard");

      if (!cardNumber.value) {
        document.getElementById("cardNumberError").textContent = "This field is required";
        cardNumber.classList.add("error");
        isValid = false;
      } else if (!validateCardNumber(cardNumber.value)) {
        document.getElementById("cardNumberError").textContent = "Please enter a valid card number";
        cardNumber.classList.add("error");
        isValid = false;
      }
      if (!expirationDate.value) {
        document.getElementById("expirationDateError").textContent = "This field is required";
        expirationDate.classList.add("error");
        isValid = false;
      } else if (!validateExpirationDate(expirationDate.value)) {
        document.getElementById("expirationDateError").textContent = "Please enter a valid expiration date";
        expirationDate.classList.add("error");
        isValid = false;
      }
      if (!securityCode.value) {
        document.getElementById("securityCodeError").textContent = "This field is required";
        securityCode.classList.add("error");
        isValid = false;
      } else if (!validateSecurityCode(securityCode.value)) {
        document.getElementById("securityCodeError").textContent = "Please enter a valid security code";
        securityCode.classList.add("error");
        isValid = false;
      }
      if (!nameOnCard.value) {
        document.getElementById("nameOnCardError").textContent = "This field is required";
        nameOnCard.classList.add("error");
        isValid = false;
      }

      // Eğer tüm alanlar geçerliyse formu gönder
      if (isValid) {
        // Formu buradan gönderebilirsiniz
        alert("Form submitted successfully!");
      }
    });
  }
}
// checkout validation end
