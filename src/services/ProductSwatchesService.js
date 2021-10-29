import { getFirstLeaf } from '../utils/util';
import fetchProductDetails from './ProductDetailsService';

const fetchProductSwatches = async () => {
    const productSwatchesURL = 'https://product-swatches.vercel.app/swatches';
    try {
        const swatchesDataResponse = await fetch(productSwatchesURL, {
            method: 'GET'
        });
        const swatchesData = await swatchesDataResponse.json();
        console.log("Swatches Data:", swatchesData);  // This is the JSON from our swatches response
        const firstLeaf = getFirstLeaf(swatchesData);
        window.localStorage.setItem("current_swatche", firstLeaf.id);
        window.localStorage.setItem("swatches_data", JSON.stringify(swatchesData));
        fetchProductDetails(firstLeaf.id);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductSwatches;