// Full cart system with quantities, remove buttons, and total (Peso currency)
let cart = [];

// Add item to cart
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCartUI();
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
}

// Update cart display
function updateCartUI() {
    const cartList = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    cartList.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${item.name} x${item.qty} — ₱${item.price.toLocaleString()}</span>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        cartList.appendChild(li);

        total += item.price * item.qty;
    });

    totalEl.textContent = `₱${total.toLocaleString()}`;
}
