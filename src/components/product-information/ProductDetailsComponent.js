import { returnProductTitle, returnProductPrice, returnProductDescription, returnProductCategory, returnColorSelectionPanel, returnMemorySelectionPanel } from '../../utils/util';

const ProductDetailsComponent = (productInfo) => {
    const productDetailsElement = document.createElement('div');
    productDetailsElement.className = 'product-details-container';
    const { title: productTitle, price: productPrice, description: productDescription , category: productCategory} = productInfo;

    // Product Title
    const getProductTitle = returnProductTitle(productTitle);
    productDetailsElement.appendChild(getProductTitle);

    // Product Price
    const getProductPrice = returnProductPrice(productPrice);
    productDetailsElement.appendChild(getProductPrice);

    const horizanalRule1 = document.createElement('hr');
    productDetailsElement.appendChild(horizanalRule1);

    // Product Description
    const getProductDescription = returnProductDescription(productDescription);
    productDetailsElement.appendChild(getProductDescription);
    
    const horizanalRule2 = document.createElement('hr');
    productDetailsElement.appendChild(horizanalRule2);


    // Product Filters here
    // Color filters
    const current_swatch = JSON.parse(window.localStorage.getItem('current_swatches'));
    const getColorElements = returnColorSelectionPanel(current_swatch);
    productDetailsElement.appendChild(getColorElements);

    // memory filters
    const getMemoryElements = returnMemorySelectionPanel(current_swatch);
    productDetailsElement.appendChild(getMemoryElements);

    const horizanalRule3 = document.createElement('hr');
    productDetailsElement.appendChild(horizanalRule3);

    // Product Category
    const getProductCategory = returnProductCategory(productCategory);
    productDetailsElement.appendChild(getProductCategory);

    return productDetailsElement;
}
export default ProductDetailsComponent;