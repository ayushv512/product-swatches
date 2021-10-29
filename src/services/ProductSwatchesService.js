import { getFirstLeaf } from '../utils/util';
import fetchProductDetails from './ProductDetailsService';

const fetchProductSwatches = async () => {
    const productSwatchesURL = 'https://product-swatches.vercel.app/swatches';
    let swatchesData;
    try {
        // API Caching thru Local storage 
        swatchesData = JSON.parse(window.localStorage.getItem('swatches_data'));
        if (!(swatchesData && swatchesData.swatches)) {
            const swatchesDataResponse = await fetch(productSwatchesURL, {
                method: 'GET'
            });
            swatchesData = await swatchesDataResponse.json();
        }
        const firstLeaf = getFirstLeaf(swatchesData);
        window.localStorage.setItem("current_swatch", firstLeaf.id);
        window.localStorage.setItem("swatches_data", JSON.stringify(swatchesData));
        fetchProductDetails(firstLeaf.id);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductSwatches;