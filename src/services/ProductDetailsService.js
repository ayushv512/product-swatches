import ProductPage from '../page/ProductPage';

const fetchProductDetails = (productSwatchId) => {
    const productDetailsURL = 'https://product-swatches.vercel.app/products/';

    fetch(productDetailsURL + productSwatchId, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) { // The API call was successful!
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then((data) => {
        console.log("Response data:" , data);  // This is the JSON from our response
        ProductPage(data);
    }).catch((err) => console.warn('Something went wrong.', err));  // There was an error
}

export default fetchProductDetails;