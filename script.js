const products = [
  {
    id: 1,
    name: "Velocity Green",
    price: 129,
    image: "./assets/shoe1.png",
    category: "mens",
  },
  {
    id: 2,
    name: "Shadow Runner",
    price: 149,
    image: "./assets/shoe2.png",
    category: "mens",
  },
  {
    id: 3,
    name: "Urban Motion",
    price: 139,
    image: "./assets/shoe3.png",
    category: "womens",
  },
  {
    id: 4,
    name: "Sprint Elite",
    price: 159,
    image: "./assets/shoe4.png",
    category: "kids",
  },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentCategory = "all";

const productContainer = document.querySelector("#productContainer");

function renderProducts() {
  productContainer.innerHTML = "";

  let filteredProducts = products;

  if (currentCategory !== "all") {
    filteredProducts = products.filter((product) => {
      return product.category === currentCategory;
    });
  }

  filteredProducts.forEach((product) => {
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
  localStorage.setItem("cart", JSON.stringify(cart));

  let total = 0;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
  
    <div class="empty-cart">

      <i class="fa-solid fa-bag-shopping"></i>

      <h4>Your Cart is Empty</h4>

      <p>Add your favorite sneakers to get started.</p>

      <button class="pick-btn continue-shopping">
        Continue Shopping
      </button>

    </div>

  `;

    cartTotal.textContent = "$0";

    updateCartBadge();

    return;
  }

  cart.forEach((product) => {
    total += product.price * product.quantity;

    cartItems.innerHTML += `
    
      <div class="cart-item">

        <img src="${product.image}" alt="${product.name}">

        <div class="cart-info">

       <h5>${product.name}</h5>

       <div class="qty-box">

      <button class="qty-btn minus" data-id="${product.id}">
          -
      </button>

       <span class="qty">
          ${product.quantity}
       </span>

       <button class="qty-btn plus" data-id="${product.id}">
          +
      </button>

  </div>

   <p class="cart-price">
      ${product.price * product.quantity}
   </p>

    </div>

      </div>

    `;
  });

  cartTotal.textContent = `${total}`;
  updateCartBadge();
}

function updateQuantity(productId, action) {
  const product = cart.find((item) => item.id === productId);

  if (!product) return;

  if (action === "increase") {
    product.quantity++;
  }

  if (action === "decrease") {
    product.quantity--;
  }

  cart = cart.filter((item) => item.quantity > 0);

  renderCart();
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

      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

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
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartButton");
const mobileCartCount = document.querySelector("#mobileCartButton");
const mensLink = document.querySelector("#mensLink");
const womensLink = document.querySelector("#womensLink");
const kidsLink = document.querySelector("#kidsLink");

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

cartItems.addEventListener("click", (e) => {
  const button = e.target;

  if (
    !button.classList.contains("plus") &&
    !button.classList.contains("minus")
  ) {
    return;
  }

  const productId = Number(button.dataset.id);

  if (button.classList.contains("plus")) {
    updateQuantity(productId, "increase");
  }

  if (button.classList.contains("minus")) {
    updateQuantity(productId, "decrease");
  }
});

function updateCartBadge() {
  const totalItems = cart.reduce((total, product) => {
    return total + product.quantity;
  }, 0);

  cartCount.textContent = `Cart (${totalItems})`;
  mobileCartCount.textContent = `Cart (${totalItems})`;
}

renderCart();

mensLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "mens";

  renderProducts();

  setupCartButtons();
});

womensLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "womens";

  renderProducts();

  setupCartButtons();
});

kidsLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "kids";

  renderProducts();

  setupCartButtons();
});
