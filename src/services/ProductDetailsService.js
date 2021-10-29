import ProductPage from '../page/ProductPage';

const fetchProductDetails = async (productSwatchId) => {
    const productDetailsURL = 'https://product-swatches.vercel.app/products/';

    const productsInfo = JSON.parse(window.localStorage.getItem("products_info")) || {};
    let productDetails;
    if (productsInfo && productsInfo[productSwatchId]) {
        productDetails = productsInfo[productSwatchId];
    } else {
        try {
            const productDetailsResponse = await fetch(productDetailsURL + productSwatchId, {
                method: 'GET'
            });
            productDetails = await productDetailsResponse.json();
            productsInfo[productSwatchId] = productDetails;
            window.localStorage.setItem("products_info", JSON.stringify(productsInfo));
        } catch (err) {
            console.warn('Something went wrong.', err)
        }
    }
    console.log("Response data:", productDetails);  // This is the JSON from our response
    ProductPage(productDetails);
}

export default fetchProductDetails;