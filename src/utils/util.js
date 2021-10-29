export function getFirstLeaf(response) {
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

export function returnColorSelectionPanel(response) {
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

export function addColor(color) {
    const elem = document.createElement('div');
    elem.classList.add('color-circle');
    elem.style.backgroundColor = color;
    return elem;
}