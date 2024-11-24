const slides = document.querySelector(".slides");
const slideElements = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pagination = document.querySelector(".pagination");

let currentIndex = 0;
const totalSlides = slideElements.length;
const intervalTime = 3000;
let slideInterval;

for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  pagination.appendChild(dot);
}

const dots = document.querySelectorAll(".pagination span");

function updateSlider() {
  slides.style.transition = "transform 0.5s ease-in-out";
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function pauseSlider() {
  clearInterval(slideInterval);
}

function startSlider() {
  slideInterval = setInterval(nextSlide, intervalTime);
}

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

pagination.addEventListener("click", e => {
  if (e.target.tagName === "SPAN") {
    pauseSlider();
    currentIndex = Array.from(dots).indexOf(e.target);
    updateSlider();
    startSlider();
  }
});

slides.addEventListener("mouseenter", pauseSlider);
slides.addEventListener("mouseleave", startSlider);

let startX = 0;
let endX = 0;

slides.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (startX - endX > swipeThreshold) {
    pauseSlider();
    nextSlide();
    startSlider();
  } else if (endX - startX > swipeThreshold) {
    pauseSlider();
    prevSlide();
    startSlider();
  }
}


startSlider();
