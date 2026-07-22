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
const categoryLinks = [allLink, mensLink, womensLink, kidsLink];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let selectedSize = "7";

products.forEach((product) => {
  product.wishlist = wishlist.includes(product.id);
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
    const isWishlisted = wishlist.includes(product.id);

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

      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter((id) => id !== productId);
      } else {
        wishlist.push(productId);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      renderProducts();
      setupCartButtons();
      setupWishlistButtons();
    });
  });
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

function showToast(message) {
  toastMessage.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

renderCart();

allLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "all";

  animateFilter(() => {
    renderProducts();

    setupCartButtons();
    setupWishlistButtons();
  });

  updateActiveCategory(allLink);
});

mensLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "mens";

  animateFilter(() => {
    renderProducts();

    setupCartButtons();
    setupWishlistButtons();
  });

  updateActiveCategory(mensLink);
});

womensLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "womens";

  animateFilter(() => {
    renderProducts();

    setupCartButtons();
    setupWishlistButtons();
  });

  updateActiveCategory(womensLink);
});

kidsLink.addEventListener("click", (e) => {
  e.preventDefault();

  currentCategory = "kids";

  animateFilter(() => {
    renderProducts();

    setupCartButtons();
    setupWishlistButtons();
  });

  updateActiveCategory(kidsLink);
});

function updateActiveCategory(activeLink) {
  categoryLinks.forEach((link) => {
    link.classList.remove("link-active");
  });

  activeLink.classList.add("link-active");
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
