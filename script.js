const products = [
  {
    id: 1,
    name: "Velocity Green",
    price: 129,
    image: "./assets/shoe1.png",
    category: "mens",
    rating: 4.9,
    description: "Lightweight everyday sneaker built for all-day comfort.",
    wishlist: false,
  },
  {
    id: 2,
    name: "Shadow Runner",
    price: 149,
    image: "./assets/shoe2.png",
    category: "mens",
    rating: 4.8,
    description: "Performance runner with responsive cushioning and grip.",
    wishlist: false,
  },
  {
    id: 3,
    name: "Urban Motion",
    price: 139,
    image: "./assets/shoe3.png",
    category: "womens",
    rating: 4.7,
    description: "Modern streetwear sneaker with a sleek premium finish.",
    wishlist: false,
  },
  {
    id: 4,
    name: "Sprint Elite",
    price: 159,
    image: "./assets/shoe4.png",
    category: "kids",
    rating: 5.0,
    description: "Ultra-light design made for speed, comfort, and confidence.",
    wishlist: false,
  },
];

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
const allLink = document.querySelector("#allLink");
let currentCategory = "all";
const productContainer = document.querySelector("#productContainer");
const toast = document.querySelector("#toast");
const toastMessage = document.querySelector("#toastMessage");
const searchInput = document.querySelector("#searchInput");
let searchValue = "";
const sortSelect = document.querySelector("#sortSelect");
let currentSort = "default";
const quickViewOverlay = document.querySelector("#quickViewOverlay");
const quickClose = document.querySelector("#quickClose");
const quickImage = document.querySelector("#quickImage");
const quickTitle = document.querySelector("#quickTitle");
const quickRating = document.querySelector("#quickRating");
const quickDescription = document.querySelector("#quickDescription");
const quickPrice = document.querySelector("#quickPrice");
const quickCartBtn = document.querySelector("#quickCartBtn");
const wishlistSidebar = document.querySelector("#wishlistSidebar");
const wishlistButton = document.querySelector("#wishlistButton");
const mobileWishlistButton = document.querySelector("#mobileWishlistButton");
const closeWishlist = document.querySelector("#closeWishlist");
const wishlistItems = document.querySelector("#wishlistItems");
const checkoutOverlay = document.querySelector("#checkoutOverlay");
const checkoutClose = document.querySelector("#checkoutClose");
const checkoutBtn = document.querySelector(".checkout-btn");
const summarySubtotal = document.querySelector("#summarySubtotal");
const summaryTotal = document.querySelector("#summaryTotal");
const checkoutForm = document.querySelector("#checkoutForm");
const customerName = document.querySelector("#customerName");
const customerEmail = document.querySelector("#customerEmail");
const customerPhone = document.querySelector("#customerPhone");
const customerAddress = document.querySelector("#customerAddress");
const successOverlay = document.querySelector("#successOverlay");
const continueShopping = document.querySelector("#continueShopping");
const confettiContainer = document.querySelector("#confettiContainer");
const pickSneakersBtn = document.querySelector("#pickSneakersBtn");
const mobileCategoryLinks = document.querySelectorAll(".mobile-category");
const footerMens = document.querySelector("#footerMens");
const footerWomens = document.querySelector("#footerWomens");
const footerKids = document.querySelector("#footerKids");
const mobileAllLink = document.querySelector("#mobileAllLink");
const mobileMensLink = document.querySelector("#mobileMensLink");
const mobileWomensLink = document.querySelector("#mobileWomensLink");
const mobileKidsLink = document.querySelector("#mobileKidsLink");
const categoryLinks = [allLink, mensLink, womensLink, kidsLink];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let selectedSize = "7";

products.forEach((product) => {
  product.wishlist = wishlist.some((item) => {
    return item.id === product.id;
  });
});

wishlistButton.addEventListener("click", (e) => {
  e.preventDefault();

  wishlistSidebar.classList.add("wishlist-sidebar-active");
});

mobileWishlistButton.addEventListener("click", (e) => {
  e.preventDefault();

  wishlistSidebar.classList.add("wishlist-sidebar-active");
});

closeWishlist.addEventListener("click", () => {
  wishlistSidebar.classList.remove("wishlist-sidebar-active");
});

function animateFilter(callback) {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(15px) scale(.96)";
  });

  setTimeout(() => {
    callback();

    const newCards = document.querySelectorAll(".card");

    newCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(-15px) scale(.96)";
    });

    requestAnimationFrame(() => {
      newCards.forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
      });
    });
  }, 300);
}

function renderProducts() {
  productContainer.innerHTML = "";

  let filteredProducts = products;

  if (currentCategory !== "all") {
    filteredProducts = products.filter((product) => {
      return product.category === currentCategory;
    });
  }

  filteredProducts = filteredProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  if (currentSort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (currentSort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = `
    <div class="no-products">

      <i class="fa-solid fa-magnifying-glass"></i>

      <h3>No Products Found</h3>

      <p>Try searching with a different keyword.</p>

    </div>
  `;

    return;
  }

  filteredProducts.forEach((product) => {
    const isWishlisted = wishlist.some((item) => {
      return item.id === product.id;
    });

    productContainer.innerHTML += `
  <div class="card">


  <button
  class="wishlist-btn"
  data-id="${product.id}">

  <i class="${isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}"></i>

  </button>

    <img src="${product.image}" alt="${product.name}" />

    <div class="card-content">

      <div class="rating">
        <i class="fa-solid fa-star"></i>
        <span>${product.rating}</span>
      </div>

      <h4 class="product-title">
        ${product.name}
      </h4>

      <p class="product-description">
        ${product.description}
      </p>

      <div class="card-footer">

        <span class="product-price">
          $${product.price}
        </span>

        <button
          class="pick-btn add-to-cart"
          data-id="${product.id}">
          Add To Cart
        </button>

        <button
        class="quick-view-btn"
        data-id="${product.id}">
        Quick View
        </button>

      </div>

    </div>

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
    updateCheckoutSummary();

    return;
  }

  cart.forEach((product) => {
    total += product.price * product.quantity;

    cartItems.innerHTML += `
    
      <div class="cart-item">

        <img src="${product.image}" alt="${product.name}">

        <div class="cart-info">

       <h5>${product.name}</h5>

       <p class="cart-size">
       Size: ${product.size}
       </p>

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
  updateCheckoutSummary();
}

function renderWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  wishlistItems.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `

      <div class="empty-cart">

        <i class="fa-regular fa-heart"></i>

        <h4>Your Wishlist is Empty</h4>

        <p>Save your favorite sneakers and they'll appear here.</p>

      </div>

    `;

    return;
  }

  wishlist.forEach((product) => {
    wishlistItems.innerHTML += `
    <div class="wishlist-item">

      <img src="${product.image}" alt="${product.name}">

      <div class="wishlist-info">

        <h5>${product.name}</h5>

        <p class="wishlist-price">$${product.price}</p>

        <div class="wishlist-actions">

          <button
            class="move-cart"
            data-id="${product.id}">
            Move To Cart
          </button>

          <button
            class="remove-wishlist"
            data-id="${product.id}">
            Remove
          </button>

        </div>

      </div>

    </div>
  `;
  });
}

wishlistItems.addEventListener("click", (e) => {
  const button = e.target;

  const productId = Number(button.dataset.id);

  if (button.classList.contains("remove-wishlist")) {
    removeFromWishlist(productId);
  }

  if (button.classList.contains("move-cart")) {
    moveToCart(productId);
  }
});

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

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  const existingProduct = cart.find((item) => {
    return item.id === product.id && item.size === selectedSize;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: selectedSize,
    });
  }

  renderCart();

  showToast(`${product.name} added to cart`);
}

function setupCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      const product = products.find((item) => {
        return item.id === productId;
      });

      addToCart(productId);

      button.textContent = "✓ Added";
      button.classList.add("added-btn");

      setTimeout(() => {
        button.textContent = "Add To Cart";
        button.classList.remove("added-btn");
      }, 1500);

      setTimeout(() => {
        button.textContent = "Add To Cart";
        button.classList.remove("added-btn");
      }, 1500);

      console.log(cart);
    });
  });
}

quickCartBtn.addEventListener("click", () => {
  const productId = Number(quickCartBtn.dataset.id);

  addToCart(productId);

  quickViewOverlay.classList.remove("active");
});

function setupWishlistButtons() {
  const buttons = document.querySelectorAll(".wishlist-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      const product = products.find((item) => {
        return item.id === productId;
      });

      const existingProduct = wishlist.find((item) => {
        return item.id === productId;
      });

      if (existingProduct) {
        wishlist = wishlist.filter((item) => {
          return item.id !== productId;
        });
      } else {
        wishlist.push({
          ...product,
        });
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      renderWishlist();
      renderProducts();
      setupCartButtons();
      setupWishlistButtons();
    });
  });
}

function removeFromWishlist(productId) {
  wishlist = wishlist.filter((item) => {
    return item.id !== productId;
  });

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderWishlist();
  renderProducts();

  setupCartButtons();
  setupWishlistButtons();
  setupQuickViewButtons();

  showToast("Removed from wishlist");
}

function moveToCart(productId) {
  const product = wishlist.find((item) => {
    return item.id === productId;
  });

  if (!product) return;

  const existingProduct = cart.find((item) => {
    return item.id === productId && item.size === selectedSize;
  });

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1,
      size: selectedSize,
    });
  }

  wishlist = wishlist.filter((item) => {
    return item.id !== productId;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  renderCart();
  renderWishlist();
  renderProducts();

  setupCartButtons();
  setupWishlistButtons();
  setupQuickViewButtons();

  showToast("Moved to cart");
}

function setupQuickViewButtons() {
  const buttons = document.querySelectorAll(".quick-view-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);

      const product = products.find((item) => item.id === productId);

      quickImage.src = product.image;
      quickImage.alt = product.name;

      quickTitle.textContent = product.name;
      quickRating.textContent = product.rating;
      quickDescription.textContent = product.description;
      quickPrice.textContent = `$${product.price}`;

      quickCartBtn.dataset.id = product.id;

      selectedSize = "7";

      document.querySelectorAll(".size-btn").forEach((btn) => {
        btn.classList.remove("active");

        if (btn.dataset.size === "7") {
          btn.classList.add("active");
        }
      });

      setupSizeButtons();

      quickViewOverlay.classList.add("active");
    });
  });
}

quickClose.addEventListener("click", () => {
  quickViewOverlay.classList.remove("active");
});

quickViewOverlay.addEventListener("click", (e) => {
  if (e.target === quickViewOverlay) {
    quickViewOverlay.classList.remove("active");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    quickViewOverlay.classList.remove("active");
  }
});

function setupSizeButtons() {
  const buttons = document.querySelectorAll(".size-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      selectedSize = button.dataset.size;
    });
  });
}

hamburger.addEventListener("click", (e) => {
  e.preventDefault();

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

checkoutBtn.addEventListener("click", () => {
  checkoutOverlay.classList.add("active");
});

checkoutClose.addEventListener("click", () => {
  checkoutOverlay.classList.remove("active");
});

checkoutOverlay.addEventListener("click", (e) => {
  if (e.target === checkoutOverlay) {
    checkoutOverlay.classList.remove("active");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    checkoutOverlay.classList.remove("active");
  }
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

function updateCheckoutSummary() {
  const subtotal = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  summarySubtotal.textContent = `$${subtotal}`;
  summaryTotal.textContent = `$${subtotal}`;
}

function showToast(message) {
  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

renderWishlist();
renderCart();

allLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("all", allLink);
});

mensLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("mens", mensLink);
});

womensLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("womens", womensLink);
});

kidsLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("kids", kidsLink);
});

footerMens.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("mens", mensLink);
});

footerWomens.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("womens", womensLink);
});

footerKids.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("kids", kidsLink);
});

mobileAllLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("all", allLink);
});

mobileMensLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("mens", mensLink);
});

mobileWomensLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("womens", womensLink);
});

mobileKidsLink.addEventListener("click", (e) => {
  e.preventDefault();
  goToCategory("kids", kidsLink);
});

function updateActiveCategory(activeLink) {
  categoryLinks.forEach((link) => {
    link.classList.remove("link-active");
  });

  activeLink.classList.add("link-active");
}

function goToCategory(category, activeLink = null) {
  currentCategory = category;

  animateFilter(() => {
    renderProducts();
    setupCartButtons();
    setupWishlistButtons();
    setupQuickViewButtons();
  });

  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  if (activeLink) {
    updateActiveCategory(activeLink);
  }

  mobileMenu.classList.remove("mobile-list-active");

  icon.classList.remove("fa-xmark");
  icon.classList.add("fa-bars");
}

updateActiveCategory(allLink);
setupWishlistButtons();

searchInput.addEventListener("input", () => {
  searchValue = searchInput.value;

  renderProducts();

  setupCartButtons();
  setupWishlistButtons();
});

sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;

  animateFilter(() => {
    renderProducts();

    setupCartButtons();
    setupWishlistButtons();
  });
});

setupQuickViewButtons();

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    customerName.value.trim() === "" ||
    customerEmail.value.trim() === "" ||
    customerPhone.value.trim() === "" ||
    customerAddress.value.trim() === ""
  ) {
    showToast("Please fill all checkout details.");
    return;
  }

  if (cart.length === 0) {
    showToast("Your cart is empty.");
    return;
  }

  checkoutOverlay.classList.remove("active");

  successOverlay.classList.add("active");
  launchConfetti();

  cart = [];
  wishlist = [];

  localStorage.removeItem("cart");
  localStorage.removeItem("wishlist");

  checkoutForm.reset();

  renderCart();
  renderWishlist();
  renderProducts();

  setupCartButtons();
  setupWishlistButtons();
  setupQuickViewButtons();
});

continueShopping.addEventListener("click", () => {
  successOverlay.classList.remove("active");

  cartSidebar.classList.remove("cart-sidebar-active");

  wishlistSidebar.classList.remove("wishlist-sidebar-active");

  showToast("Thank you for shopping!");
});

function launchConfetti() {
  confettiContainer.innerHTML = "";

  const colors = [
    "#f6d700",
    "#275848",
    "#ffffff",
    "#ff6b6b",
    "#4ecdc4",
    "#6c5ce7",
  ];

  for (let i = 0; i < 80; i++) {
    const confetti = document.createElement("span");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "%";

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.animationDelay = Math.random() * 0.5 + "s";

    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";

    confettiContainer.appendChild(confetti);
  }
}

mobileCategoryLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    currentCategory = link.dataset.category;

    animateFilter(() => {
      renderProducts();

      setupCartButtons();
      setupWishlistButtons();
      setupQuickViewButtons();
    });

    mobileMenu.classList.remove("mobile-list-active");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

pickSneakersBtn.addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelector("#products").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
