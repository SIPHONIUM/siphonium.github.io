document.addEventListener('DOMContentLoaded', () => {
    fetch('shop.json')
        .then(response => response.json())
        .then(data => renderShop(data));
});

function renderShop(shops) {
    const featuredShopElement = document.getElementById('featured-shop');
    const shopListElement = document.getElementById('shop-list');

    // Afficher le shop en vedette
    const featuredShop = shops.find(shop => shop.featured);
    if (featuredShop) {
        featuredShopElement.innerHTML = `
            <a href="${featuredShop.link}">
                <div class="featured-content">
                    <img src="${featuredShop.image}" alt="${featuredShop.title}">
                    <div class="info">
                        <h2>${featuredShop.title}</h2>
                        <p>by ${featuredShop.creator}</p>
                        <span>Version: ${featuredShop.version} | ${featuredShop.price}</span>
                    </div>
                </div>
            </a>
        `;
    }

    // Afficher les autres shops
    shops.forEach(shop => {
        if (!shop.featured) {
            const shopCard = document.createElement('div');
            shopCard.classList.add('shop-card');
            shopCard.innerHTML = `
                <a href="${shop.link}">
                    <img src="${shop.image}" alt="${shop.title}">
                    <div class="details">
                        <h3>${shop.title}</h3>
                        <p>by ${shop.creator}</p>
                        <span>Version: ${shop.version}</span>
                        <p class="price">${shop.price}</p>
                    </div>
                </a>
            `;
            shopListElement.appendChild(shopCard);
        }
    });
}
