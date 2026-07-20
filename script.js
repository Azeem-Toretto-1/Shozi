const hamburger = document.querySelector("#hamburger");
const mobileMenu = document.querySelector("#mobileMenu");
const icon = document.querySelector("#hamburger i");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-list-active");

  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const shoe = document.querySelector(".shoe");

  setTimeout(() => {
    loader.classList.add("hide");
    document.body.classList.add("loaded");

    shoe.style.animation =
      "shoeEntrance 1.5s ease-out forwards, shoeFloat 4s ease-in-out infinite 1.5s";
  }, 1200);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});
