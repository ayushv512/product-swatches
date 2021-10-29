import ProductPage from '../page/ProductPage';

const fetchProductDetails = async (productSwatchId) => {
    const productDetailsURL = 'https://product-swatches.vercel.app/products/';

    try {
        const productDetailsResponse = await fetch(productDetailsURL + productSwatchId, {
            method: 'GET'
        });
        const productDetails = await productDetailsResponse.json();
        console.log("Product Details:", productDetails);  // This is the JSON from our response
        ProductPage(productDetails);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductDetails;