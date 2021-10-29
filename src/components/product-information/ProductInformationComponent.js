import BreadCrumbComponent from './BreadCrumbComponent';
import ProductDetailsComponent from './ProductDetailsComponent';
import './style.scss';

const ProductInformationComponent = (productInfo) => {
    const elemList = document.querySelectorAll('.product-information-container');
    if (elemList) {
        elemList.forEach(elem => elem.remove());
    }
    
    const { breadcrumb: productBreadCrumbs } = productInfo;
    const productInformationContainer = document.createElement('div');
    productInformationContainer.className = 'product-information-container';

    productInformationContainer.appendChild(BreadCrumbComponent(productBreadCrumbs));
    productInformationContainer.appendChild(ProductDetailsComponent(productInfo));

    return productInformationContainer;
}
export default ProductInformationComponent;