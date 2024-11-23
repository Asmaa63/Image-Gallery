const sliderSection = document.querySelector(".slider-section");
const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const pagination = document.querySelector(".pagination");

let currentIndex = 0;
let interval;

slide.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  pagination.appendChild(dot);
});

const goToSlide = (index) => {
  currentIndex = index;
  slides.style.transform = `translateX(-${index * (100 / slide.length) }%)`;
  updateDots();
};

const updateDots = () => {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slide.length;
  goToSlide(currentIndex);
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slide.length) % slide.length;
  goToSlide(currentIndex);
};

const startAutoSlide = () => {
  interval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  clearInterval(interval);
};

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

sliderSection.addEventListener("mouseenter", stopAutoSlide);
sliderSection.addEventListener("mouseleave", startAutoSlide);

let startX = 0;
let endX = 0;

sliderSection.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderSection.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

startAutoSlide();
