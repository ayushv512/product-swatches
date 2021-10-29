import fetchProductDetails from '../services/ProductDetailsService';

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

export function getFirstLeaf(response) {
    const swatches = response.swatches;
    if (
        swatches &&
        swatches.variants &&
        Array.isArray(swatches.variants) &&
        swatches.variants.length
    ) {
        swatches.variants[0].selected = true;
        for (let i = 1; i < swatches.variants.length; ++i) {
            swatches.variants[i].selected = false;
        }
        return getFirstLeaf(swatches.variants[0]);
    } else {
        return response;
    }
}

export const returnColorSelectionPanel = (response) => {
    const colorPanel = document.createElement('div');
    colorPanel.classList.add('color-panel');
    const labelElem = document.createElement('div');
    labelElem.classList.add('selection-label');
    labelElem.innerText = 'COLOR';
    colorPanel.appendChild(labelElem);
    const availableColorsElem = document.createElement('div');
    availableColorsElem.classList.add('available-colors');
    const availableColors = response.swatches.variants;
    const colorLists = availableColors.map((color) => addColor(color));
    colorLists.forEach(color => availableColorsElem.appendChild(color));
    colorPanel.appendChild(availableColorsElem);
    return colorPanel;
}

export const addColor = (color) => {
    const elem = document.createElement('div');
    elem.classList.add('color-circle');
    elem.style.backgroundColor = color.name;
    if (color.selected) {
        elem.classList.add('selected');
    }
    return elem;
}

export function returnMemorySelectionPanel(response) {
    const availableMemories = getSelectedColor(response);
    const memoryPanel = document.createElement('div');
    memoryPanel.classList.add('memory-panel');
    const labelElem = document.createElement('div');
    labelElem.classList.add('selection-label');
    labelElem.innerText = 'MEMORY';
    memoryPanel.appendChild(labelElem);
    const availableMemoriesElem = document.createElement('div');
    availableMemoriesElem.classList.add('available-memories');
    const memoryLists = availableMemories.map((memory) => addMemory(memory));
    memoryLists.forEach(memory => availableMemoriesElem.appendChild(memory));
    memoryPanel.appendChild(availableMemoriesElem);
    return memoryPanel;
}

export function getSelectedColor(response) {
    const selectedColor = response.swatches.variants.find(variant => variant.selected);
    return selectedColor.swatches.variants;
}

export function addMemory(memory) {
    const elem = document.createElement('div');
    elem.classList.add('memory-block');
    elem.innerText = memory.name;
    if (memory.selected) {
        elem.classList.add('selected');
    }
    elem.swatchId = memory.id;
    elem.addEventListener("click", fetchThisProductDetails.bind(null, elem.swatchId))
    return elem;
}

export const returnProductQuantity = () => {
    const productQuantityElement = document.createElement('input');
    productQuantityElement.type = 'number';
    productQuantityElement.id = 'product-quantity';
    productQuantityElement.className = 'product-quantity';
    productQuantityElement.min = 1;
    productQuantityElement.max = 10;
    productQuantityElement.value = 0;
    return productQuantityElement;
}

export const returnAddToCartButton = () => {
    const cartData = JSON.parse(window.localStorage.getItem("cartData"));
    const addToCartButton = document.createElement('button');
    const current_swatche = window.localStorage.getItem("current_swatche");
    if(cartData[current_swatche]) { 
        addToCartButton.disabled = true;
        addToCartButton.classList.add('btn-disabled');
    } else {
        addToCartButton.disabled = false;
        addToCartButton.classList.remove('btn-disabled');
    }
    addToCartButton.className = 'product-add-to-cart';
    addToCartButton.id = 'btn-' + current_swatche;
    addToCartButton.innerText = 'ADD TO CART';
    addToCartButton.addEventListener("click", addToCartButtonHandler);
    return addToCartButton;
}


export const returnProductCategory = (productCategory) => {
    const productCategoryElement = document.createElement('div');
    productCategoryElement.className = 'product-category';
    productCategoryElement.innerText = 'CATEGORY: ' + productCategory.toUpperCase();
    return productCategoryElement;
}

const addToCartButtonHandler = () => {
    const selectedProductSwatch = window.localStorage.getItem("current_swatche")
    const cartData = JSON.parse(window.localStorage.getItem("cartData"));
    const productQuanity =  document.querySelector('#product-quantity').value;
    const buttonSelected =  document.querySelector('#btn-'+ selectedProductSwatch);
    buttonSelected.disabled = true;
    buttonSelected.classList.add('btn-disabled');

    if(cartData[selectedProductSwatch]) {
       // cartData[selectedProductSwatch] = cartData[selectedProductSwatch] + productQuanity;
    } else {
        cartData[selectedProductSwatch] = productQuanity;
    }

    window.localStorage.setItem("cartData", JSON.stringify(cartData));
}

const fetchThisProductDetails = (swatchId) => {
    window.localStorage.setItem("current_swatche", swatchId);
    fetchProductDetails(swatchId);
}
