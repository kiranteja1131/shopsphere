const productList = document.getElementById("product-list");
const cartCount = document.getElementById("cart-count");

let cart = 0;

// Fetch products from the backend API
async function loadProducts() {
    try {
        const response = await fetch("http://localhost:5000/api/products");
        const products = await response.json();

        products.forEach(product => {
            productList.innerHTML += `
                <div class="product-card">
                    <div style="font-size: 50px">${product.emoji}</div>
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                    <button onclick="addToCart()">Add to Cart</button>
                </div>
            `;
        });
    } catch (error) {
        productList.innerHTML = "<p>Unable to load products. Please try again later.</p>";
        console.error("Error loading products:", error);
    }
}

function addToCart() {
    cart++;
    cartCount.textContent = cart;
}

loadProducts();