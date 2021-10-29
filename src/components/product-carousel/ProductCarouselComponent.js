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
    productImagesContainer.appendChild(leftArrowBtn());
    productImagesContainer.appendChild(createDisplayImage(productImages));
    productImagesContainer.appendChild(rightArrowBtn());
    return productImagesContainer;
}

const leftArrowBtn = () => {
    const leftArrowButton = document.createElement('button');
    const leftArrowIcon = document.createElement('i');
    leftArrowIcon.className = 'fas fa-chevron-left';
    leftArrowButton.appendChild(leftArrowIcon);
    leftArrowButton.disabled = true;
    leftArrowButton.innerText = '<';
    leftArrowButton.classList.add('left-arrow-button')
    return leftArrowButton;
}

const createDisplayImage = (productImages) => {
    const diplayImageContainer = document.createElement('div');
    diplayImageContainer.className = 'display-image-container';
    const diplayImageSrc = productImages[displayImage].replace('/832/832/', '/300/600/').replace('?q=70', '?q=100');
    if (document.querySelector('.product-display-image')) {
        document.querySelector('.product-display-image').src = diplayImageSrc
    }
    const productDisplayImage = document.createElement('img');
    productDisplayImage.src = diplayImageSrc;
    productDisplayImage.className = 'product-display-image';
    productDisplayImage.id = 'product-display-image';

    diplayImageContainer.appendChild(productDisplayImage);
    return diplayImageContainer

}

const rightArrowBtn = () => {
    const rightArrowButton = document.createElement('button');
    const rightArrowIcon = document.createElement('i');
    rightArrowIcon.className = 'fas fa-chevron-right';
    rightArrowButton.appendChild(rightArrowIcon);
    rightArrowButton.disabled = true;
    rightArrowButton.innerText = '>';
    rightArrowButton.classList.add('right-arrow-button')
    return rightArrowButton;
}

const createImagesList = (productImages) => {
    const imagesList = document.createElement('div');
    imagesList.className = 'images-list';


    productImages.forEach((productImageItem, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = productImageItem.replace('/832/832/', '/100/150/').replace('?q=70', '?q=100');
        imgElement.className = 'product-image';
        imgElement.id = 'product-image-' + index;
        imgElement.addEventListener('click', (event) => imageClickHandler(event))
        imagesList.appendChild(imgElement);
    });

    return imagesList;
}

const imageClickHandler = (event) => {
    console.log(event.target.id.split('-')[2]);
    displayImage = event.target.id.split('-')[2];
    createDisplayImage(productImagesCopy);
}

export default ProductCarouselComponent;