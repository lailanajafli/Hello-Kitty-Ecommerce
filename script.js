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

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggles = document.querySelectorAll(
    ".dropdownToggleAvaila, .dropdownTogglePrice, .dropdownToggleFeatur"
  );

  dropdownToggles.forEach(function (toggle) {
    toggle.addEventListener("click", function (event) {
      const dropdownMenu = this.nextElementSibling; 

      const allDropdowns = document.querySelectorAll(
        ".dropdownMenuAvaila, .dropdownMenuPrice, .dropdownMenuFeatur"
      );
      allDropdowns.forEach(function (menu) {
        if (menu !== dropdownMenu) {
          menu.style.display = "none";
        }
      });

      if (dropdownMenu.style.display === "block") {
        dropdownMenu.style.display = "none";
      } else {
        dropdownMenu.style.display = "block";
      }
    });
  });

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
  document.querySelector(".search i").addEventListener("click", () => {
    modalOverlay.style.display = "block";
    searchContainer.style.display = "block";
  });
}

const closeModal = () => {
  modalOverlay.style.display = "none";
  searchContainer.style.display = "none";
  searchResults.style.display = "none"; 
  searchInput.value = ""; 
};

if (!pathname.includes("checkout")) {
  closeBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();

    if (query.trim() === "") {
      searchResults.style.display = "none";
    } else {
      searchResults.style.display = "block";

      const filteredProducts = productsData.filter((product) => {
        return product.name.toLowerCase().includes(query);
      });

      displaySearchResults(filteredProducts);
    }
  });

  // header scroll start

  let lastScrollY = 0; 
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollY = currentScrollY; 
  });
  // header scroll end
}

function displaySearchResults(filteredProducts) {
  searchResults.innerHTML = ""; 

  const query = searchInput.value.toLowerCase(); 

  if (filteredProducts.length === 0) {
    searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
  } else {
    filteredProducts.forEach((product) => {
      const resultCont = document.createElement("div");
      resultCont.classList.add("searchResultItem");
      resultCont.innerHTML = `
    <div class="searchResultImage">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <p class="searchResultName">${product.name}</p>
  `;

      resultCont.addEventListener("click", () => {
        window.location.href = `detail.html?id=${product.id}`;
      });

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
  

function renderProducts(page, perPage, filteredProducts = null) {
  const productsContainer = document.getElementById("productsContainer");
  if (!productsContainer) return;

  const productsToDisplay = filteredProducts || productsData;
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;
  const productsForPage = productsToDisplay.slice(startIndex, endIndex);

  productsContainer.innerHTML = ""; 
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

  let count = 0; 
  let cartItems = []; 

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
          
            mainImageCart.src = product.image;
            productTitle.textContent = product.name;
            productPrice.textContent = `€${product.price.toFixed(2)}`;
            modal.style.display = "flex";
            attachModalEventListeners(modal, product); 
          } else {
            console.error("Mehsul tapilmadi. ID:", productId);
          }
          
        }

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
            ), 
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
        id: this.dataset.id, 
        name: this.dataset.name, 
        price: parseFloat(this.dataset.price), 
        quantity: 1, 
      };

     
      const existingProduct = cartData.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartData.push(product);
      }

 
      localStorage.setItem("cartData", JSON.stringify(cartData));

 
      document.getElementById("cartModal").style.display = "block";
    });
  });

  const cartItemsContainer = document.querySelector("#cartItemsContainer");


  if (pathname.includes("cart")) {
    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
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
          <i class="fa-regular fa-trash-can" style="color: #000000; font-size: 18px;"></i>
        </div>
      </div>
    </div>
    <div class="totalPrice">€${(item.price * item.quantity).toFixed(2)}</div>
    `;
      cartItemsContainer.appendChild(cartRow);
    });
  }

  document.querySelectorAll(".deleteItem").forEach((deleteButton) => {
    deleteButton.addEventListener("click", (event) => {
      const itemIndex = event.currentTarget.dataset.index; 
      cartData.splice(itemIndex, 1); 
      localStorage.setItem("cartData", JSON.stringify(cartData)); 

      const cartRow = event.currentTarget.closest(".cartRow");
      cartRow.remove();

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

    const MAX_QUANTITY = 10; 
    let quantity = parseInt(quantityInput.textContent) || 1; 
    quantityInput.textContent = quantity;

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

function updateProductCount(count) {
  const productsCountElement = document.getElementById("productsCount");
  if (productsCountElement) {
    productsCountElement.textContent = `${count}`;
  }
}

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

function updatePaginationActiveButton() {
  const buttons = document.querySelectorAll(".pageBtn");
  buttons.forEach((btn, index) => {
    btn.classList.toggle("active", index + 1 === currentPage);
  });
}

function showPage(pageNumber) {
  currentPage = pageNumber;
  renderProducts(currentPage, productsPerPage);
  updatePaginationActiveButton();
}

function filterByPrice(minPrice, maxPrice) {
  const filteredProducts = productsData.filter((product) => {
    const price = parseFloat(product.price);
    return !isNaN(price) && price >= minPrice && price <= maxPrice;
  });
  renderProducts(1, productsPerPage, filteredProducts);
  setupPagination(productsPerPage);
}

function filterProductsByPrice() {
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;
  filterByPrice(minPrice, maxPrice);
}

if (pathname.includes("shop")) {
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

function resetPriceFilter() {
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.value = "default"; 
  }
  renderProducts(1, productsPerPage);
  setupPagination(productsPerPage);
}


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

  renderProducts(1, productsPerPage, sortedProducts); 
}

const dropdownItems = document.querySelectorAll(".dropdownItemF");
const selectedFeatureElement = document.getElementById("selectedFeatur");

if (!selectedFeatureElement) {
} else {
  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const clickedItem = event.currentTarget;

      const sortOption = clickedItem.dataset.sort;
      const sortText = clickedItem.querySelector("span").textContent;

      selectedFeatureElement.textContent = sortText;

      sortProducts(sortOption);
    });
  });
}

renderProducts(1, productsPerPage);




document.addEventListener("DOMContentLoaded", () => {
  const checkOutBtn = document.querySelector(".checkOutBtn");
  if (checkOutBtn) {
    checkOutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "./checkout.html"; 
    });
  }

  

  // checkout validation start
  if (window.location.pathname.includes("checkout")) {
    const form = document.querySelector(".checkoutForm");
    const cartItems = JSON.parse(localStorage.getItem("cartData")) || []; 
    console.log(cartItems);

    
    const cartContainer = document.querySelector(".cartContainer");
    const totalAmountElement = document.querySelector(".totalAmount");
    const discountElement = document.querySelector(".discount");
    const applyCouponButton = document.querySelector(".applyButton");
    const couponInput = document.querySelector(".couponInput");
    
    let totalAmount = 0;
    const discountRate = 0.1; 
    const validCoupon = "leyla30"; 
    
    function updateCart(amount) {
      totalAmount += amount;
      totalAmountElement.textContent = `Cəmi: ${totalAmount.toFixed(2)} AZN`;
      discountElement.textContent = "Endirim: 0.00 AZN";
    }
    
    applyCouponButton.addEventListener("click", () => {
      const enteredCoupon = couponInput.value.trim();
    
      if (enteredCoupon === validCoupon) {
        const discountAmount = totalAmount * discountRate;
        const newTotal = totalAmount - discountAmount;
    
        discountElement.textContent = `Endirim: ${discountAmount.toFixed(2)} AZN`;
        totalAmountElement.textContent = `Cəmi: ${newTotal.toFixed(2)} AZN`;
    
        alert("Kupon tətbiq olundu!");
      } else {
        alert("Yanlış kupon kodu daxil etdiniz. Zəhmət olmasa yenidən yoxlayın.");
      }
    });
    

    updateCart(50); 
    

    if (cartContainer) {
      cartItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("productSummary");
        itemElement.innerHTML = `
          <div class="product-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="product-info">
            <p>${item.name}</p>
            <p>${item.price.toFixed(2)} EUR</p>
          </div>
        `;
        cartContainer.appendChild(itemElement);
        totalAmount += item.price;
      });
    }
const productSummary = document.querySelector('.productSummary');


if(pathname.includes("checkout")){

  if (cartItems) {
    cartItems.forEach((item) => {      
      productSummary.innerHTML=''
      productSummary.innerHTML += `
        <div class="product-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-info">
          <p>${item.name}</p>
          <p>${item.price.toFixed(2)} EUR</p>
        </div>
      `;
    });
  }
}



    
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault(); 

  
        const errorMessages = document.querySelectorAll(".errorMessage");
        errorMessages.forEach((message) => (message.textContent = ""));

        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach((input) => input.classList.remove("error"));

        let isValid = true;

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

        // Payment Section
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

        if (isValid) {
          alert("Form submitted successfully!");
        }
      });
    }
  }
  // checkout validation end
});
