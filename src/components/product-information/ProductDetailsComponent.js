const ProductDetailsComponent = (productInfo) => {
    const productDetailsElement = document.createElement('div');
    productDetailsElement.className = 'product-details-container';

    const productTitleElement = document.createElement('div');
    const productPriceElement = document.createElement('div');
    const productDescriptionElement = document.createElement('div');
    const productCategoryElement = document.createElement('div');

    productTitleElement.className = 'product-title';
    productTitleElement.innerText = productInfo.title.charAt(0).toUpperCase() + productInfo.title.slice(1);;

    productPriceElement.className = 'product-price';
    productPriceElement.innerText = '₹ ' + productInfo.price.toFixed(2);

    const horizanalRule1 = document.createElement('hr');
    const horizanalRule2 = document.createElement('hr');
    const horizanalRule3 = document.createElement('hr');

    productDescriptionElement.className = 'product-description';
    productDescriptionElement.innerText = productInfo.description;

    productCategoryElement.className = 'product-category';
    productCategoryElement.innerText = 'CATEGORY: ' + productInfo.category.toUpperCase();


    productDetailsElement.appendChild(productTitleElement);
    productDetailsElement.appendChild(productPriceElement);
    productDetailsElement.appendChild(horizanalRule1);
    productDetailsElement.appendChild(productDescriptionElement);
    productDetailsElement.appendChild(horizanalRule2);
    productDetailsElement.appendChild(horizanalRule3);
    productDetailsElement.appendChild(productCategoryElement);

    return productDetailsElement;
}
export default ProductDetailsComponent;