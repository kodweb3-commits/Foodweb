// =============================================
// DAMMIZZ FOOD MART — MAIN JAVASCRIPT
// =============================================

// ---- PRODUCT DATA ----
const productsData = [
  // Vegetables
  { id: 1,  name: "Fresh Broccoli",        category: "vegetables", emoji: "🥦", price: 1200, oldPrice: 1500, badge: "organic", rating: 4.8, reviews: 124 },
  { id: 2,  name: "Ripe Tomatoes (1kg)",   category: "vegetables", emoji: "🍅", price: 800,  oldPrice: null,  badge: "new",     rating: 4.7, reviews: 89  },
  { id: 3,  name: "Baby Carrots (500g)",   category: "vegetables", emoji: "🥕", price: 650,  oldPrice: 800,   badge: "sale",    rating: 4.6, reviews: 67  },
  { id: 4,  name: "Sweet Corn (2 pcs)",    category: "vegetables", emoji: "🌽", price: 500,  oldPrice: null,  badge: null,      rating: 4.5, reviews: 55  },
  { id: 5,  name: "Garden Cucumber",       category: "vegetables", emoji: "🥒", price: 400,  oldPrice: 550,   badge: "sale",    rating: 4.4, reviews: 43  },
  { id: 6,  name: "Green Bell Pepper",     category: "vegetables", emoji: "🫑", price: 600,  oldPrice: null,  badge: "organic", rating: 4.7, reviews: 78  },
  // Fruits
  { id: 7,  name: "Red Apple (6 pcs)",     category: "fruits",     emoji: "🍎", price: 2200, oldPrice: 2800,  badge: "sale",    rating: 4.9, reviews: 201 },
  { id: 8,  name: "Sweet Orange (1kg)",    category: "fruits",     emoji: "🍊", price: 1500, oldPrice: null,  badge: "organic", rating: 4.8, reviews: 165 },
  { id: 9,  name: "Ripe Mango (2 pcs)",    category: "fruits",     emoji: "🥭", price: 900,  oldPrice: 1100,  badge: "sale",    rating: 4.9, reviews: 230 },
  { id: 10, name: "Watermelon (whole)",    category: "fruits",     emoji: "🍉", price: 3500, oldPrice: null,  badge: "new",     rating: 4.7, reviews: 98  },
  { id: 11, name: "Banana Bunch",          category: "fruits",     emoji: "🍌", price: 700,  oldPrice: 850,   badge: "sale",    rating: 4.6, reviews: 143 },
  { id: 12, name: "Fresh Pineapple",       category: "fruits",     emoji: "🍍", price: 1800, oldPrice: null,  badge: null,      rating: 4.5, reviews: 72  },
  // Dairy
  { id: 13, name: "Full Cream Milk (1L)",  category: "dairy",      emoji: "🥛", price: 950,  oldPrice: null,  badge: null,      rating: 4.8, reviews: 189 },
  { id: 14, name: "Farm Fresh Eggs (12)",  category: "dairy",      emoji: "🥚", price: 1800, oldPrice: 2100,  badge: "sale",    rating: 4.9, reviews: 276 },
  { id: 15, name: "Cheddar Cheese (200g)", category: "dairy",      emoji: "🧀", price: 2800, oldPrice: null,  badge: "new",     rating: 4.7, reviews: 87  },
  { id: 16, name: "Natural Yoghurt (500g)",category: "dairy",      emoji: "🍦", price: 1200, oldPrice: 1400,  badge: "sale",    rating: 4.6, reviews: 64  },
  // Bakery
  { id: 17, name: "Whole Wheat Bread",     category: "bakery",     emoji: "🍞", price: 750,  oldPrice: null,  badge: null,      rating: 4.7, reviews: 134 },
  { id: 18, name: "Butter Croissant (4)",  category: "bakery",     emoji: "🥐", price: 1200, oldPrice: 1500,  badge: "sale",    rating: 4.8, reviews: 91  },
  { id: 19, name: "Blueberry Muffin (2)", category: "bakery",     emoji: "🧁", price: 1100, oldPrice: null,  badge: "new",     rating: 4.6, reviews: 58  },
  { id: 20, name: "Bagel (6 pack)",        category: "bakery",     emoji: "🥯", price: 1400, oldPrice: 1600,  badge: "sale",    rating: 4.5, reviews: 42  },
  // Meat
  { id: 21, name: "Chicken Breast (1kg)", category: "meat",       emoji: "🍗", price: 4500, oldPrice: 5200,  badge: "sale",    rating: 4.8, reviews: 198 },
  { id: 22, name: "Beef Steak (500g)",     category: "meat",       emoji: "🥩", price: 6000, oldPrice: null,  badge: "new",     rating: 4.7, reviews: 87  },
  { id: 23, name: "Smoked Fish (whole)",   category: "meat",       emoji: "🐟", price: 3200, oldPrice: 3800,  badge: "sale",    rating: 4.6, reviews: 112 },
  { id: 24, name: "Fresh Prawns (500g)",   category: "meat",       emoji: "🦐", price: 5500, oldPrice: null,  badge: "organic", rating: 4.9, reviews: 75  },
  // Beverages
  { id: 25, name: "Orange Juice (1L)",     category: "beverages",  emoji: "🍹", price: 1400, oldPrice: 1700,  badge: "sale",    rating: 4.7, reviews: 143 },
  { id: 26, name: "Mineral Water (1.5L)",  category: "beverages",  emoji: "💧", price: 400,  oldPrice: null,  badge: null,      rating: 4.5, reviews: 89  },
  { id: 27, name: "Green Tea (20 bags)",   category: "beverages",  emoji: "🍵", price: 1100, oldPrice: 1300,  badge: "organic", rating: 4.8, reviews: 167 },
  { id: 28, name: "Coconut Water (500ml)", category: "beverages",  emoji: "🥥", price: 900,  oldPrice: null,  badge: "new",     rating: 4.9, reviews: 203 },
];

// ---- STATE ----
let cart = JSON.parse(localStorage.getItem("dammizzCart") || "[]");
let visibleCount = 12;
let currentFilter = "all";
let filteredProducts = [...productsData];
let currentTesti = 0;

// ---- UTILITIES ----
const formatNaira = (n) => `₦${n.toLocaleString("en-NG")}.00`;

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function saveCart() {
  localStorage.setItem("dammizzCart", JSON.stringify(cart));
}

// ---- PRELOADER ----
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("fade-out");
  }, 2000);
});

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) navbar.classList.add("scrolled");
  else navbar.classList.remove("scrolled");

  // Back to top
  const btt = document.getElementById("backToTop");
  if (window.scrollY > 400) btt.classList.add("show");
  else btt.classList.remove("show");
});

// ---- HAMBURGER ----
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

// Close nav on link click (mobile)
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  });
});

// ---- SEARCH BAR ----
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchToggle.addEventListener("click", () => {
  searchBar.classList.toggle("open");
  if (searchBar.classList.contains("open")) searchInput.focus();
});

function doSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return;
  currentFilter = "all";
  filteredProducts = productsData.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
  document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
  document.querySelector('[data-filter="all"]').classList.add("active");
  visibleCount = 12;
  renderProducts();
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  searchBar.classList.remove("open");
}

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", e => { if (e.key === "Enter") doSearch(); });

// ---- RENDER PRODUCTS ----
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  const toShow = filteredProducts.slice(0, visibleCount);

  if (toShow.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--gray);">
      <div style="font-size:3rem;margin-bottom:12px;">🔍</div>
      <h3>No products found</h3><p>Try a different search or filter.</p></div>`;
    return;
  }

  toShow.forEach((p, i) => {
    const badgeHtml = p.badge
      ? `<span class="product-badge badge-${p.badge}">${p.badge === "sale" ? "Sale" : p.badge === "new" ? "New" : "Organic"}</span>`
      : "";
    const oldPriceHtml = p.oldPrice ? `<span class="price-old">${formatNaira(p.oldPrice)}</span>` : "";

    const card = document.createElement("div");
    card.className = "product-card reveal";
    card.dataset.category = p.category;
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="product-img-wrap">
        ${badgeHtml}
        <span>${p.emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          ${"★".repeat(Math.floor(p.rating))}${"☆".repeat(5 - Math.floor(p.rating))}
          <span>(${p.reviews})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            <span class="price-current">${formatNaira(p.price)}</span>
            ${oldPriceHtml}
          </div>
          <button class="add-to-cart" data-id="${p.id}" title="Add to cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>`;
    grid.appendChild(card);

    // Reveal animation
    requestAnimationFrame(() => {
      setTimeout(() => card.classList.add("visible"), i * 70);
    });
  });

  // Attach add-to-cart events
  grid.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(parseInt(btn.dataset.id)));
  });

  // Load more button
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (visibleCount >= filteredProducts.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "inline-flex";
  }
}

// ---- FILTER TABS ----
document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentFilter = tab.dataset.filter;
    filteredProducts = currentFilter === "all"
      ? [...productsData]
      : productsData.filter(p => p.category === currentFilter);
    visibleCount = 12;
    renderProducts();
  });
});

// ---- LOAD MORE ----
document.getElementById("loadMoreBtn").addEventListener("click", () => {
  visibleCount += 8;
  renderProducts();
});

// ---- CART ----
function addToCart(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, emoji: product.emoji, price: product.price, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`✅ ${product.emoji} ${product.name} added to cart!`, "success");
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Item removed from cart", "error");
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    updateCartUI();
  }
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  showToast("🗑️ Cart cleared", "error");
}

function updateCartUI() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const cartItems = document.getElementById("cartItems");
  const emptyCart = document.getElementById("emptyCart");
  const cartFooter = document.getElementById("cartFooter");

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    cartItems.innerHTML = "";
    cartFooter.style.display = "none";
  } else {
    emptyCart.style.display = "none";
    cartFooter.style.display = "block";

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-emoji">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${formatNaira(item.price)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>`).join("");

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById("cartSubtotal").textContent = formatNaira(subtotal);
    document.getElementById("cartTotal").textContent = formatNaira(subtotal);
  }
}

// ---- CART TOGGLE ----
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCartFn() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

cartToggle.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartFn);
cartOverlay.addEventListener("click", closeCartFn);
document.getElementById("clearCartBtn").addEventListener("click", clearCart);

// Shop now from empty cart
document.getElementById("shopNowCart").addEventListener("click", closeCartFn);

// Checkout button
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) return;
  showToast("🎉 Order placed! We'll contact you shortly.", "success");
  cart = [];
  saveCart();
  updateCartUI();
  closeCartFn();
});

// ---- TESTIMONIALS ----
function setTesti(index) {
  document.querySelectorAll(".testi-card").forEach((c, i) => {
    c.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
  currentTesti = index;
}

document.querySelectorAll(".dot").forEach(dot => {
  dot.addEventListener("click", () => setTesti(parseInt(dot.dataset.index)));
});

// Auto-rotate testimonials
setInterval(() => {
  setTesti((currentTesti + 1) % 3);
}, 5000);

// ---- NEWSLETTER ----
document.getElementById("nlBtn").addEventListener("click", () => {
  const email = document.getElementById("nlEmail").value.trim();
  if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }
  const successEl = document.getElementById("nlSuccess");
  successEl.classList.add("show");
  document.getElementById("nlEmail").value = "";
  document.getElementById("nlBtn").textContent = "✓ Subscribed!";
  document.getElementById("nlBtn").style.background = "var(--green-dark)";
  setTimeout(() => successEl.classList.remove("show"), 5000);
});

// ---- CONTACT FORM ----
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const message = document.getElementById("cfMessage").value.trim();

  if (!name || !email || !message) {
    showToast("Please fill in all required fields", "error");
    return;
  }

  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = "Sending…";
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById("formSuccess").classList.add("show");
    this.reset();
    btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    showToast("✅ Message sent successfully!", "success");
    setTimeout(() => document.getElementById("formSuccess").classList.remove("show"), 6000);
  }, 1400);
});

// ---- CATEGORY CARDS ----
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    const cat = card.dataset.category;
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    const tab = document.querySelector(`[data-filter="${cat}"]`);
    if (tab) {
      tab.classList.add("active");
      currentFilter = cat;
      filteredProducts = productsData.filter(p => p.category === cat);
      visibleCount = 12;
      renderProducts();
    }
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
  });
});

// ---- BACK TO TOP ----
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

function observeRevealElements() {
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// Observe static sections
document.querySelectorAll(
  ".cat-card, .why-feature, .ci-card, .offer-card"
).forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ---- INIT ----
renderProducts();
updateCartUI();

// Observe after a moment for dynamically added cards
setTimeout(observeRevealElements, 100);