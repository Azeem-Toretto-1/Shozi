const hamburger = document.querySelector("#hamburger");
const mobileMenu = document.querySelector("#mobileMenu");
const icon = document.querySelector("#hamburger i");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-list-active");
  
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});