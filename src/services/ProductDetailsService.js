import ProductPage from '../page/ProductPage';

const fetchProductDetails = async (productSwatchId, swatchesData) => {
    const productDetailsURL = 'https://product-swatches.vercel.app/products/';

    try {
        const productDetailsResponse = await fetch(productDetailsURL + productSwatchId, {
            method: 'GET'
        });
        const productDetails = await productDetailsResponse.json();
        console.log("Response data:", productDetails);  // This is the JSON from our response
        ProductPage(productDetails, swatchesData);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductDetails;