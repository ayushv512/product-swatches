import ProductCarouselComponent from '../components/product-carousel/ProductCarouselComponent';
import ProductInformationComponent from '../components/product-information/ProductInformationComponent';
import './style.scss';

const ProductPage = (responeData) => {
    const productInfo = responeData.productInfo;
    const { images: productImages } = productInfo;
    const rootContainer = document.getElementById('app');
    rootContainer.className = 'root-container';
    rootContainer.appendChild(ProductCarouselComponent(productImages));
    rootContainer.appendChild(ProductInformationComponent(productInfo));
}

export default ProductPage;