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
    elem.colorName = color.name;
    elem.addEventListener("click", fetchThisColorProductDetails);

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
    elem.addEventListener("click", fetchThisMemoryProductDetails);
    return elem;
}

export const returnProductCategory = (productCategory) => {
    const productCategoryElement = document.createElement('div');
    productCategoryElement.className = 'product-category';
    productCategoryElement.innerText = 'CATEGORY: ' + productCategory.toUpperCase();
    return productCategoryElement;
}

function fetchThisColorProductDetails() {
    const colorName = this.colorName;
    const response = JSON.parse(window.localStorage.getItem('current_swatches'));
    response.swatches.variants.forEach(variant => {
        if (variant.name === colorName) {
            variant.selected = true;
            // this is our new selection
            const firstLeaf = getFirstLeaf(variant);
            fetchProductDetails(firstLeaf.id);
        } else {
            variant.selected = false;
            // recursively set false
            recursivelDeselectObject(variant);
        }
    });
    window.localStorage.setItem('current_swatches', JSON.stringify(response));
}

function fetchThisMemoryProductDetails() {
    // have to mark this memory as selected and others as unselected
    fetchProductDetails(this.swatchId);
}

function recursivelDeselectObject(variant) {
    const swatches = variant.swatches || { variants: [] };
    swatches.variants.forEach(variant => {
        variant.selected = false;
        recursivelDeselectObject(variant);
    })
}