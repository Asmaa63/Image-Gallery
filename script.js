// Import the slider functions (optional for modularity)
const slides = document.querySelector(".slides");
const slideElements = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pagination = document.querySelector(".pagination");

let currentIndex = 0;
const totalSlides = slideElements.length;
const intervalTime = 3000;
let slideInterval;

// Create dots for pagination
const dots = slideElements.map((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  pagination.appendChild(dot);
  return dot;
});

// Function to update the slider
function updateSlider() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// Functions to navigate slides
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Start and pause slider
function startSlider() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

function pauseSlider() {
  clearInterval(slideInterval);
}

// Add event listeners
nextButton.addEventListener("click", () => {
  pauseSlider();
  nextSlide();
  startSlider();
});

prevButton.addEventListener("click", () => {
  pauseSlider();
  prevSlide();
  startSlider();
});

// Add swipe functionality
let startX = 0;
let endX = 0;

slides.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

slides.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  if (startX - endX > swipeThreshold) {
    nextSlide();
  } else if (endX - startX > swipeThreshold) {
    prevSlide();
  }
}

// Add event delegation for pagination
pagination.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    currentIndex = dots.indexOf(e.target);
    updateSlider();
  }
});

// Start slider on load
startSlider();
