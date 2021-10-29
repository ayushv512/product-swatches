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

export function getSelectionMatrix(response) {
    const colorArray = [];
    const storageArray = [];
    const memoryArray = [];
    const swatches = response.swatches;
    if (swatches.name === 'colors') {
        colorArray.length = 0;
        swatches.variants.forEach(variant => {
            colorArray.push(variant);
            const swatches = variant.swatches;
            if (swatches.name === 'memory') {
                memoryArray.length = 0;
                swatches.variants.forEach(variant => {
                    memoryArray.push(variant);
                    const swatches = variant.swatches;
                    if (swatches.name === 'storage') {
                        storageArray.length = 0;
                        swatches.variant.forEach(variant => {
                            storageArray.push(variant);
                        })
                    }
                })
            }
        });
    }
    if (
        swatches &&
        swatches.variants &&
        Array.isArray(swatches.variants) &&
        swatches.variants.length
    ) {
        return getFirstLeaf(swatches.variants[0]);
    } else {
        response.selected = true;
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

export const returnProductCategory = (productCategory) => {
    const productCategoryElement = document.createElement('div');
    productCategoryElement.className = 'product-category';
    productCategoryElement.innerText = 'CATEGORY: ' + productCategory.toUpperCase();
    return productCategoryElement;
}

function fetchThisProductDetails(swatchId) {
    fetchProductDetails(swatchId);
}