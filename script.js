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

if (
  pathname.includes("index") ||
  pathname.includes("shop") ||
  pathname.includes("cart")
) {
  // Arama butonuna tıklanınca modal'ı göster
  document.querySelector(".search i").addEventListener("click", () => {
    modalOverlay.style.display = "block";
    searchContainer.style.display = "block";
  });
}

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
        window.location.href = `detail.html?id=${product.id}`;
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

    // Məhsulları `localStorage`-a yazırıq
    localStorage.setItem("productsData", JSON.stringify(products));

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


  function formatPrice(price) {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) || numericPrice <= 0
      ? "Fiyat geçersiz"
      : `€${numericPrice.toFixed(2)} EUR`;
  }
  

// Ürünleri render etme fonksiyonu
function renderProducts(page, perPage, filteredProducts = null) {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) return;

  const productsToDisplay = filteredProducts || productsData;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const productsForPage = productsToDisplay.slice(startIndex, endIndex);

  productsContainer.innerHTML = ""; // Təmizlə

  productsForPage.forEach((product) => {
    const productName = product.name || "Ad yoxdur";
    const productPrice = product.price ? formatPrice(product.price) : "Fiyat geçersiz";
    const productImage = product.image || "placeholder-image.jpg";
    const productHoverImage = product.imageHover || productImage;

    const productElement = document.createElement("div");
    productElement.className = "productsCont";

    productElement.innerHTML = `
      <div class="imgCont">
        <a href="detail.html?id=${product.id}">
          <img src="${productImage}" alt="${productName}">
          <img src="${productHoverImage}" alt="${productName} Hover" class="hover-img">
        </a>
      </div>
      <p class="productName">${productName}</p>
      <p class="productPrice">${productPrice}</p>
      <div>
        <a class="chooseOption" data-product-id="${product.id}">Choose Options</a>
      </div>
    `;

    productsContainer.appendChild(productElement);
  });

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
  const totalItemsCount = document.querySelector(".totalItemsCount");

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
            console.log({
              mainImageCart,
              productTitle,
              productPrice,
              modal,
              product,
            });
          
            mainImageCart.src = product.image; // Burada hata oluşuyorsa yukarıdaki log ile eksik elemanı görebilirsiniz.
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
            quantity: parseInt(
              modal.querySelector(".quantityInput").textContent
            ), // Dinamik miktar
          };

          const existingProduct = cartItems.find(
            (item) => item.id === productInCart.id
          );
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

      if (
        pathname.includes("index") ||
        pathname.includes("shop") ||
        pathname === "/"
      ) {
        // Fiyat aralığı inputlarını dinle
        closeBtn.addEventListener("click", () => {
          modal.style.display = "none";
        });
      }

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
    });

  function updateCartModal() {
    cartModalContent.innerHTML = "";

    let totalItems = 0;
    const cartData = [];

    cartItems.forEach((item) => {
      totalItems += item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cartProduct");
      cartItem.innerHTML = `
          <img src="${item.id}" alt="${item.name}" class="cartImage">
          <div>
            <h3>${item.name}</h3>
            <p>€${(item.price * item.quantity).toFixed(
              2
            )} (€${item.price.toFixed(2)} x ${item.quantity})</p>
          </div>
        `;

      cartData.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      });

      cartModalContent.appendChild(cartItem);
    });

    localStorage.setItem("cartData", JSON.stringify(cartData));

    totalItemsCount.textContent = `View cart: ${totalItems}`;
  }

  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = {
        id: this.dataset.id, // Ürün ID'si
        name: this.dataset.name, // Ürün adı
        price: parseFloat(this.dataset.price), // Ürün fiyatı
        quantity: 1, // Başlangıç miktarı
      };

      // Eğer ürün zaten varsa, miktarı artır
      const existingProduct = cartData.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.push(product);
      }

      // Güncellenmiş sepet verisini LocalStorage'a kaydet
      localStorage.setItem("cartData", JSON.stringify(cartData));

      // Sepet modalını göster (isteğe bağlı)
      document.getElementById("cartModal").style.display = "block";
    });
  });

  const cartItemsContainer = document.querySelector("#cartItemsContainer");

  // Ürünleri DOM'a ekle

  if (pathname.includes("cart")) {
    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = "<p>Sepetiniz boş!</p>";
      return;
    }

    cartData.forEach((item, index) => {
      const cartRow = document.createElement("div");
      cartRow.classList.add("cartRow");
      console.log(item.name);
      cartRow.innerHTML += `
    <div class="productDetails">
      <img src="${item.id}" alt="${item.name}" class="productImage">
      <div class="productInfo">
        <h2 class="productName">${item.name}</h2>
        <p class="productPrice">€${item.price.toFixed(2)}</p>
      </div>
    </div>
    <div class="quan">
      <div class="quantitySection">
        <div style="display: flex;">
          <button class="quantityDecrease">-</button>
          <span type="number" id="quantity" value="1" min="1" class="quantityInput">${
            item.quantity
          }</span>
          <button class="quantityIncrease">+</button>
        </div>
        <div style="cursor: pointer;" class="deleteItem" data-index="${index}">
          <i class="fa-regular fa-trash-can" style="color: #000000;"></i>
        </div>
      </div>
    </div>
    <div class="totalPrice">€${(item.price * item.quantity).toFixed(2)}</div>
    `;
      cartItemsContainer.appendChild(cartRow);
    });
  }

  // Çöp ikonuna tıklama olayı
  document.querySelectorAll(".deleteItem").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      const itemIndex = event.currentTarget.dataset.index; // Silinecek ürünün index'i
      cartData.splice(itemIndex, 1); // Ürünü cartData'dan sil
      localStorage.setItem("cartData", JSON.stringify(cartData)); // Güncellenmiş sepeti localStorage'a kaydet

      // DOM'dan kaldır
      const cartRow = event.currentTarget.closest(".cartRow");
      cartRow.remove();

      // Eğer sepet boş ise, kullanıcıya bilgi göster
      if (cartData.length === 0) {
        cartItemsContainer.innerHTML = "<p>Sepetiniz boş!</p>";
      }
    });
  });





  
  function attachModalEventListeners(modalElement, product) {
    const increaseBtn = modalElement.querySelector(".quantityIncrease");
    const decreaseBtn = modalElement.querySelector(".quantityDecrease");
    const quantityInput = modalElement.querySelector(".quantityInput");

    if (!increaseBtn || !decreaseBtn || !quantityInput) {
      console.error("Artırma/Azaltma elementleri bulunamadı.");
      return;
    }

    const MAX_QUANTITY = 10; // Maksimum ürün miktarı
    let quantity = parseInt(quantityInput.textContent) || 1; // Varsayılan veya mevcut değer
    quantityInput.textContent = quantity;

    // Artırma butonu
    increaseBtn.addEventListener("click", () => {
      if (quantity < MAX_QUANTITY) {
        quantity++;
        updateQuantity(quantityInput, quantity);
      } else {
        alert(`En fazla ${MAX_QUANTITY} adet seçebilirsiniz.`);
      }
    });

    // Azaltma butonu
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        updateQuantity(quantityInput, quantity);
      } else {
        alert("Miktar 1'den az olamaz.");
      }
    });
  }

  // Miktarı güncelleyen yardımcı fonksiyon
  function updateQuantity(inputElement, newQuantity) {
    inputElement.textContent = newQuantity;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  fetchProductDetails(productId);
});

function fetchProductDetails(productId) {
  fetch("product.json")
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((item) => item.id == productId);

      if (product) {
        document.querySelector(".mainImage").src = product.image;
        document.querySelector(".productTitle").textContent = product.name;
        document.querySelector(
          ".productPrice"
        ).textContent = `€${product.price} EUR`;

        const thumbnailContainer = document.querySelector(
          ".thumbnailContainer"
        );

        product.images.forEach((imgSrc) => {
          const thumbCont = document.createElement("div");
          thumbCont.className = "thumbCont";

          const img = document.createElement("img");
          img.className = "thumbnail";
          img.src = imgSrc;
          img.alt = product.name;

          thumbCont.appendChild(img);
          thumbnailContainer.appendChild(thumbCont);

          thumbCont.addEventListener("click", () => {
            document.querySelector(".mainImage").src = imgSrc;
          });
        });
      }
    })
    .catch((error) => console.error("JSON yükleme hatası:", error));
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

// Reset butonuna tıklama olayını düzenleyelim
function resetPriceFilter() {
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = "default"; // Sıralama seçimini sıfırla
  }
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
const dropdownItems = document.querySelectorAll(".dropdownItemF");
const selectedFeatureElement = document.getElementById("selectedFeatur");

if (!selectedFeatureElement) {
} else {
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const clickedItem = event.currentTarget;

      // Sort seçeneği ve metni al
      const sortOption = clickedItem.dataset.sort;
      const sortText = clickedItem.querySelector("span").textContent;

      // Sadece kendisinin metnini göster
      selectedFeatureElement.textContent = sortText;

      // Ürünleri sırala
      sortProducts(sortOption);
    });
  });
}

// Sayfa yüklendiğinde tüm ürünleri render et
renderProducts(1, productsPerPage);






document.addEventListener("DOMContentLoaded", () => {
  const checkOutBtn = document.querySelector(".checkOutBtn");
  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "./checkout.html"; // Check-out səhifəsinə yönləndirin
    });
  }

  

  // checkout validation start
  if (window.location.pathname.includes("checkout")) {
    const form = document.querySelector(".checkoutForm");
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || []; // Səbət məhsullarını yüklə
    console.log(cartItems);

    // Checkout səhifəsində səbət məhsullarını göstər və ümumi məbləğ hesabla
    const cartContainer = document.querySelector(".cartContainer");
    const totalAmountElement = document.querySelector(".totalAmount");
    const discountElement = document.querySelector(".discount");
    let totalAmount = 0;
    const discountRate = 0.1; // 10% endirim

    if (cartContainer) {
      cartItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cartItem");
        itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <p>${item.name}</p>
          <p>${item.price.toFixed(2)} EUR</p>
        `;
        cartContainer.appendChild(itemElement);
        totalAmount += item.price;
      });

      // Endirimi tətbiq et və məbləği göstər
      const discount = totalAmount * discountRate;
      const finalAmount = totalAmount - discount;

      if (totalAmountElement && discountElement) {
        discountElement.textContent = `Discount: ${discount.toFixed(2)} EUR`;
        totalAmountElement.textContent = `Total: ${finalAmount.toFixed(2)} EUR`;
      }
    }

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); // Formun göndərilməsini engelle

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
          emailError.textContent = "Enter an email or phone number";
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
          document.getElementById("firstNameError").textContent =
            "Enter a first name";
          firstName.classList.add("error");
          isValid = false;
        }
        if (!lastName.value) {
          document.getElementById("lastNameError").textContent =
            "Enter a last name";
          lastName.classList.add("error");
          isValid = false;
        }
        if (!address.value) {
          document.getElementById("addressError").textContent =
            "Enter an address";
          address.classList.add("error");
          isValid = false;
        }
        if (!postalCode.value) {
          document.getElementById("postalCodeError").textContent =
            "Enter a postal code";
          postalCode.classList.add("error");
          isValid = false;
        }
        if (!city.value) {
          document.getElementById("cityError").textContent =
            "Enter a city";
          city.classList.add("error");
          isValid = false;
        }
        if (!phone.value || !validatePhone(phone.value)) {
          document.getElementById("phoneError").textContent =
            "Enter a phone number";
          phone.classList.add("error");
          isValid = false;
        }

        // Payment Section doğrulaması
        const cardNumber = document.getElementById("cardNumber");
        const expirationDate = document.getElementById("expirationDate");
        const securityCode = document.getElementById("securityCode");
        const nameOnCard = document.getElementById("nameOnCard");

        if (!cardNumber.value) {
          document.getElementById("cardNumberError").textContent =
            "Enter a card number";
          cardNumber.classList.add("error");
          isValid = false;
        } else if (!validateCardNumber(cardNumber.value)) {
          document.getElementById("cardNumberError").textContent =
            "Please enter a valid card number";
          cardNumber.classList.add("error");
          isValid = false;
        }
        if (!expirationDate.value) {
          document.getElementById("expirationDateError").textContent =
            "Enter a valid expiration date";
          expirationDate.classList.add("error");
          isValid = false;
        } else if (!validateExpirationDate(expirationDate.value)) {
          document.getElementById("expirationDateError").textContent =
            "Please enter a valid expiration date";
          expirationDate.classList.add("error");
          isValid = false;
        }
        if (!securityCode.value) {
          document.getElementById("securityCodeError").textContent =
            "This field is required";
          securityCode.classList.add("error");
          isValid = false;
        } else if (!validateSecurityCode(securityCode.value)) {
          document.getElementById("securityCodeError").textContent =
            "Enter the CVV or security code on your card";
          securityCode.classList.add("error");
          isValid = false;
        }
        if (!nameOnCard.value) {
          document.getElementById("nameOnCardError").textContent =
            "Enter your name exactly as it’s written on your card";
          nameOnCard.classList.add("error");
          isValid = false;
        }

        // Eğer tüm alanlar geçerliyse formu gönder
        if (isValid) {
          alert("Form submitted successfully!");
        }
      });
    }
  }
  // checkout validation end
});
