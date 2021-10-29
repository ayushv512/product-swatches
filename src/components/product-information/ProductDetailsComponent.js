import { returnProductTitle, returnProductPrice, returnProductDescription, returnColorSelectionPanel, returnProductCategory } from '../../utils/util';

const ProductDetailsComponent = (productInfo, swatchesData) => {
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

    // Product Filters
    const getColorElements = returnColorSelectionPanel(swatchesData);
    productDetailsElement.appendChild(getColorElements);

    const horizanalRule3 = document.createElement('hr');
    productDetailsElement.appendChild(horizanalRule3);

    // Product Category
    const getProductCategory = returnProductCategory(productCategory);
    productDetailsElement.appendChild(getProductCategory);

    return productDetailsElement;
}
export default ProductDetailsComponent;