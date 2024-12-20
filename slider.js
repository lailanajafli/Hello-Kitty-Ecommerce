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










