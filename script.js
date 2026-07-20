const products = [
  {
    id: 1,
    name: "Velocity Green",
    price: 129,
    image: "./assets/shoe1.png",
  },
  {
    id: 2,
    name: "Shadow Runner",
    price: 149,
    image: "./assets/shoe2.png",
  },
  {
    id: 3,
    name: "Urban Motion",
    price: 139,
    image: "./assets/shoe3.png",
  },
  {
    id: 4,
    name: "Sprint Elite",
    price: 159,
    image: "./assets/shoe4.png",
  },
];

let cart = [];

const productContainer = document.querySelector("#productContainer");

function renderProducts() {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}" />

        <button
         class="pick-btn add-to-cart"
         data-id="${product.id}">
         Add to Cart
        </button>
      </div>
    `;
  });
}

renderProducts();

function renderCart() {
  cartItems.innerHTML = "";

  cart.forEach((product) => {
    cartItems.innerHTML += `
    
      <div class="cart-item">

        <img src="${product.image}" alt="${product.name}">

        <div class="cart-info">

          <h5>${product.name}</h5>

          <p>$${product.price}</p>

        </div>

      </div>

    `;
  });
}

setupCartButtons();

function setupCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      const product = products.find((item) => {
        return item.id === productId;
      });

      cart.push(product);

      renderCart();

      console.log(cart);
    });
  });
}

const hamburger = document.querySelector("#hamburger");
const mobileMenu = document.querySelector("#mobileMenu");
const icon = document.querySelector("#hamburger i");
const cartSidebar = document.querySelector("#cartSidebar");
const cartButton = document.querySelector("#cartButton");
const mobileCartButton = document.querySelector("#mobileCartButton");
const closeCart = document.querySelector("#closeCart");
const cartItems = document.querySelector("#cartItems");

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

cartButton.addEventListener("click", (e) => {
  e.preventDefault();

  cartSidebar.classList.add("cart-sidebar-active");
});

mobileCartButton.addEventListener("click", (e) => {
  e.preventDefault();

  cartSidebar.classList.add("cart-sidebar-active");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("cart-sidebar-active");
});
