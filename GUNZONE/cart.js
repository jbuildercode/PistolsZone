// Load cart from localStorage or create empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart function
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); // update cart icon/count automatically
}

// Update cart counter in nav
function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    const countSpan = document.getElementById("cart-count");
    if (countSpan) countSpan.textContent = count;
}

// Add item to cart
function addToCart(name, price) {
    const item = cart.find(i => i.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    saveCart();
    loadCartPanel();
}

// Cart panel toggle
function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("active");
    loadCartPanel();
}

// Load cart inside slide-out panel (pistols.html)
function loadCartPanel() {
    if (!document.getElementById("cart-items")) return;

    let container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₱${item.price.toLocaleString()}
                </div>
                <div>
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    ${item.qty}
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">X</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toLocaleString();
}

// Load cart for full cart.html page
function loadCartPage() {
    if (!document.getElementById("cart-items")) return;

    let container = document.getElementById("cart-items");
    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₱${item.price.toLocaleString()}
                </div>
                <div>
                    <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                    ${item.qty}
                    <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").innerText = total.toLocaleString();
    updateCartCount();
}

// Change quantity
function changeQty(index, amount) {
    cart[index].qty += amount;

    if (cart[index].qty <= 0) cart.splice(index, 1);

    saveCart();
    loadCartPanel();
    loadCartPage();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    loadCartPanel();
    loadCartPage();
}

// Redirect to checkout page
function goToCheckout() {
    window.location.href = "checkout.html";
}

// Initial cart count update
updateCartCount();
