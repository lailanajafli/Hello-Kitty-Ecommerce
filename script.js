// Burger menü tıklama olayını yönetmek için
const dropdowns = document.querySelectorAll('.userItem.dropdown'); // tüm dropdownları seç

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', function() {
    // Bu tıklama ile sadece aktif dropdown menüsünü açıyoruz
    dropdown.classList.toggle('active'); // "active" sınıfını ekle/kaldır
  });
});



document.addEventListener('DOMContentLoaded', function() {
  // Dropdown menülerini seçiyoruz
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      const dropdown = this.closest('.dropdown'); // Bu tıklamanın ait olduğu dropdown menüsünü seçiyoruz

      // Menüyü açıp kapatıyoruz
      dropdown.classList.toggle('active');

      // Menü açıldığında tüm diğer dropdown menülerini kapatmak isterseniz:
      const allDropdowns = document.querySelectorAll('.dropdown');
      allDropdowns.forEach(item => {
        if (item !== dropdown) {
          item.classList.remove('active');
        }
      });

      // Sayfa kaymasını engellemek için
      event.preventDefault();
    });
  });

  // Menü dışına tıklanırsa kapanmasını sağlamak için
  document.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(event.target) && !event.target.matches('.dropdown-toggle')) {
        dropdown.classList.remove('active');
      }
    });
  });

  // Currency Dropdown item'larına tıklanırsa, ilgili currency'yi seçip güncelleme
  const currencyItems = document.querySelectorAll('.customValyuta .dropdown-item');
  currencyItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedCurrency = this.getAttribute('data-currency'); // Seçilen currency
      document.getElementById('selectedCurrency').textContent = selectedCurrency; // Currency öğesini güncelle
      this.closest('.dropdown').classList.remove('active'); // Menü kapanacak
    });
  });

  // Language Dropdown item'larına tıklanırsa, ilgili dil seçip güncelleme
  const languageItems = document.querySelectorAll('.customLang .dropdown-item');
  languageItems.forEach(item => {
    item.addEventListener('click', function() {
      const selectedLanguage = this.querySelector('span').textContent; // Seçilen dili alıyoruz
      document.getElementById('selectedLanguage').textContent = selectedLanguage; // Language öğesini güncelle
      this.closest('.dropdown').classList.remove('active'); // Menü kapanacak
    });
  });
});









document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');
  
  // Menü açma ve kapama işlevselliği
  if (burgerMenu) {
      burgerMenu.addEventListener('click', function() {
          // Burger menüsünü tıkladığında navbar'ı aç/kapat
          navLinks.classList.toggle('active');
          
          // Burger menüsünü open/close geçişini sağla
          burgerMenu.classList.toggle('active');
      });
  }
});

