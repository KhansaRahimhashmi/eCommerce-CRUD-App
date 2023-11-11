document.addEventListener('DOMContentLoaded', function () {
    let productsContainer = document.querySelector('.products');

    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            let response = await data.json();

            for (let i = 0; i < response.length; i++) {
                displayProduct(response[i]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    function displayProduct(product) {
        let description = product.description;
        let title = product.title;
        productsContainer.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.category}" class="product-img">
                <div class="product-content">
                    <h2 class="product-title">${
                        title.length > 18 ? title.substring(0, 18).concat(' ...') : title
                    }</h2>
                    <h4 class="product-category">${product.category}</h4>
                    <p class="product-description">${
                        description.length > 80
                            ? description.substring(0, 80).concat(' ...more')
                            : description
                    }</p>
                    <div class="product-price-container">
                        <h3 class="product-price">$${product.price}</h3>
                        <button data-productId="${product.id}" class="delete-product">Delete</button>
                        <button data-productId="${product.id}" class="update-product">Update</button>
                    </div>
                </div>
            </div>
        `;
    }

    async function deleteProduct(productId) {
        try {
            await fetch(`https://fakestoreapi.com/products/${productId}`, {
                method: 'DELETE',
            });
            // Reload products after deletion
            productsContainer.innerHTML = '';
            await fetchProducts('https://fakestoreapi.com/products');
        } catch (err) {
            console.log(err);
        }
    }

    async function updateProduct(productId, updatedProductData) {
        try {
            await fetch(`https://fakestoreapi.com/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });
            // Reload products after update
            productsContainer.innerHTML = '';
            await fetchProducts('https://fakestoreapi.com/products');
        } catch (err) {
            console.log(err);
        }
    }

    async function createProduct(newProductData) {
        try {
            await fetch('https://fakestoreapi.com/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProductData),
            });
            // Reload products after creation
            productsContainer.innerHTML = '';
            await fetchProducts('https://fakestoreapi.com/products');
        } catch (err) {
            console.log(err);
        }
    }

    async function handleDelete(event) {
        const productIdToDelete = event.target.dataset.productId;
        await deleteProduct(productIdToDelete);
    }

    async function handleUpdate(event) {
        const productIdToUpdate = event.target.dataset.productId;
        const updatedProductData = {
            title: 'Updated Product',
            category: 'Updated Category',
            description: 'Product details updated.',
            price: 129.99,
            image: 'https://example.com/updated-product-image.jpg',
        };
        await updateProduct(productIdToUpdate, updatedProductData);
    }

    async function handleCreate() {
        const newProductData = {
            title: 'New Product',
            category: 'Electronics',
            description: 'A new product added through CRUD operation.',
            price: 99.99,
            image: 'https://example.com/new-product-image.jpg',
        };
        await createProduct(newProductData);
    }

    productsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-product')) {
            handleDelete(event);
        }

        if (event.target.classList.contains('update-product')) {
            handleUpdate(event);
        }
    });

    fetchProducts('https://fakestoreapi.com/products');
});
