async function deleteProduct(productId) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: 'DELETE',
        });

        console.log('Delete Response:', response);

        if (response.ok) {
            // Successful delete (HTTP status code 204)
            console.log('Product deleted successfully');
            // Reload products after deletion
            productsContainer.innerHTML = '';
            await fetchProducts('https://fakestoreapi.com/products');
        } else {
            console.error('Failed to delete product. HTTP status:', response.status);
        }
    } catch (err) {
        console.error('Delete Error:', err);
    }
}
