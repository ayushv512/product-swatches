import { getFirstLeaf } from '../utils/util';
import fetchProductDetails from './ProductDetailsService';

const fetchProductSwatches = async () => {
    const productSwatchesURL = 'https://product-swatches.vercel.app/swatches';
    let swatchesData;
    try {
        swatchesData = JSON.parse(window.localStorage.getItem('swatches_data'));
        if (!(swatchesData && swatchesData.swatches)) {
            const swatchesDataResponse = await fetch(productSwatchesURL, {
                method: 'GET'
            });
            swatchesData = await swatchesDataResponse.json();
        }
        const firstLeaf = getFirstLeaf(swatchesData);
        window.localStorage.setItem("current_swatches", firstLeaf.id);
        window.localStorage.setItem("swatches_data", JSON.stringify(swatchesData));
        console.log("Response data:", swatchesData);  // This is the JSON from our swatches response
        fetchProductDetails(firstLeaf.id);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductSwatches;