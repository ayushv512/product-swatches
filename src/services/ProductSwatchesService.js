import ProductPage from '../page/ProductPage';
import { getFirstLeaf } from '../utils/util';
import fetchProductDetails from './ProductDetailsService';

const fetchProductSwatches = async () => {
    const productSwatchesURL = 'https://product-swatches.vercel.app/swatches';
    try {
        const swatchesDataResponse = await fetch(productSwatchesURL, {
            method: 'GET'
        });
        const swatchesData = await swatchesDataResponse.json();
        const firstLeaf = getFirstLeaf(swatchesData);
        fetchProductDetails(firstLeaf.id, swatchesData);
    } catch (err) {
        console.warn('Something went wrong.', err)
    }
}

export default fetchProductSwatches;