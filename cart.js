function addToCart(button) {
  const product = button.parentElement;
  const id = product.dataset.id;
  const name = product.dataset.name;
  const price = parseFloat(product.dataset.price);
  const image = product.dataset.image;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find(p => p.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div>
        <img src="${item.image}" width="50"> ${item.name} - ₹${item.price} x ${item.qty}
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
  totalEl.innerText = `Total: ₹${total}`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function checkout() {
  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  window.location.href = "order.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) {
    loadCart();
  }
});