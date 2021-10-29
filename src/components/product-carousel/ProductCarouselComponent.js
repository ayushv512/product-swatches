import './style.scss';
let displayImage = 0;
let productImagesCopy;

const ProductCarouselComponent = (productImages) => {
    productImagesCopy = productImages;

    const elemList = document.querySelectorAll('.product-images-container');
    if (elemList) {
        elemList.forEach(elem => elem.remove());
    }

    const productImagesContainer = document.createElement('div');
    productImagesContainer.className = 'product-images-container';
    productImagesContainer.appendChild(createImagesList(productImages));
    productImagesContainer.appendChild(createDisplayImage(productImages));

    return productImagesContainer;
}

const createDisplayImage = (productImages) => {
    const diplayImageContainer = document.createElement('div');
    diplayImageContainer.className = 'display-image-container';

    const diplayImageSrc = productImages[displayImage].replace('/832/832/', '/300/600/').replace('?q=70', '?q=100');
    if (document.querySelector('product-display-image')) {
        document.querySelector('product-display-image').src = diplayImageSrc
    }
    const productDisplayImage = document.createElement('img');
    productDisplayImage.src = diplayImageSrc;
    productDisplayImage.className = 'product-display-image';
    productDisplayImage.id = 'product-display-image';

    diplayImageContainer.appendChild(productDisplayImage);
    return diplayImageContainer

}

const createImagesList = (productImages) => {
    const imagesList = document.createElement('div');
    imagesList.className = 'images-list';


    productImages.forEach((productImageItem, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = productImageItem.replace('/832/832/', '/100/150/').replace('?q=70', '?q=100');
        imgElement.className = 'product-image';
        imgElement.id = 'product-image-' + index;
        imgElement.addEventListener('mouseover', (event) => moveoverImageHandler(event))
        imagesList.appendChild(imgElement);
    });

    return imagesList;
}

const moveoverImageHandler = (event) => {
    console.log(event.target.id.split('-')[2]);
    displayImage = event.target.id.split('-')[2];
    createDisplayImage(productImagesCopy);
}

export default ProductCarouselComponent;