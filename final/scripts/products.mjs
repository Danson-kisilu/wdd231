// products.mjs - Fetch products, display, filter, modal, and weather
import { setYear, setLastModified } from './date.mjs';
import { setupNavigation } from './navigation.mjs';
import { loadWeather } from './weather.mjs';

let allProducts = [];

function getProductImage(imageName) {
    return `images/${imageName}`;
}

async function fetchProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Failed to load products');
        allProducts = await response.json();
        displayProducts(allProducts);
        setupFilters();
        setupModals();
    } catch (error) {
        console.error('Error:', error);
        const container = document.getElementById('products-container');
        if (container) {
            container.innerHTML = '<p class="error">Unable to load products. Please try again later.</p>';
        }
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // Using map() array method and template literals
    container.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <img src="${getProductImage(product.image)}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='https://picsum.photos/id/13/400/300'">
            <div class="card-content">
                <h3>${product.name}</h3>
                <span class="category">${product.category}</span>
                <p class="price">${product.price}</p>
                <p>${product.description.substring(0, 80)}...</p>
                <small>📍 ${product.location}</small>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const product = products.find(p => p.id === id);
            if (product) showModal(product);
        });
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            // Using filter() array method
            const filtered = filter === 'all' 
                ? allProducts 
                : allProducts.filter(p => p.category === filter);
            displayProducts(filtered);
        });
    });
}

function setupModals() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.close());
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.close();
    });
}

function showModal(product) {
    const modal = document.getElementById('productModal');
    document.getElementById('modalImage').src = getProductImage(product.image);
    document.getElementById('modalImage').alt = product.name;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDesc').textContent = product.description;
    document.getElementById('modalPrice').textContent = product.price;
    document.getElementById('modalQuantity').textContent = product.quantity;
    document.getElementById('modalFarmer').textContent = product.farmer;
    document.getElementById('modalLocation').textContent = product.location;
    document.getElementById('modalExport').textContent = product.exportReady ? 'Yes ✅' : 'No ❌';
    modal.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    setLastModified();
    setupNavigation();
    fetchProducts();
    loadWeather();
});