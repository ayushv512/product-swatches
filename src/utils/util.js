export const returnProductTitle = (productTitle) => {
    const productTitleElement = document.createElement('div');
    productTitleElement.className = 'product-title';
    productTitleElement.innerText = productTitle.charAt(0).toUpperCase() + productTitle.slice(1);
    return productTitleElement;
}

export const returnProductPrice = (productPrice) => {
    const productPriceElement = document.createElement('div');
    productPriceElement.className = 'product-price';
    productPriceElement.innerText = '₹ ' + productPrice.toFixed(2);
    return productPriceElement;
}

export const returnProductDescription = (productDescription) => {
    const productDescriptionElement = document.createElement('div');
    productDescriptionElement.className = 'product-description';
    productDescriptionElement.innerText = productDescription;
    return productDescriptionElement;
}

export const getFirstLeaf = (response) => {
    const swatches = response.swatches;
    if (
        swatches &&
        swatches.variants &&
        Array.isArray(swatches.variants) &&
        swatches.variants.length
    ) {
        return getFirstLeaf(swatches.variants[0]);
    } else {
        return response;
    }
}

export const returnColorSelectionPanel = (response) => {
    const colorPanel = document.createElement('div');
    colorPanel.classList.add('color-panel');
    const labelElem = document.createElement('div');
    labelElem.innerText = 'COLOR';
    colorPanel.appendChild(labelElem);
    const availableColorsElem = document.createElement('div');
    availableColorsElem.classList.add('available-colors');
    const availableColors = response.swatches.variants.map(
        (variant) => variant.name
    );
    const colorLists = availableColors.map((color) => addColor(color));
    colorLists.forEach(color => availableColorsElem.appendChild(color));
    colorPanel.appendChild(availableColorsElem);
    return colorPanel;
}

export const addColor = (color) => {
    const elem = document.createElement('div');
    elem.classList.add('color-circle');
    elem.style.backgroundColor = color;
    return elem;
}

export const returnProductCategory = (productCategory) => {
    const productCategoryElement = document.createElement('div');
    productCategoryElement.className = 'product-category';
    productCategoryElement.innerText = 'CATEGORY: ' + productCategory.toUpperCase();
    return productCategoryElement;
}