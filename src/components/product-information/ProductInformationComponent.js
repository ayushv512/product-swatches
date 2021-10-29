import BreadCrumbComponent from './BreadCrumbComponent';
import ProductDetailsComponent from './ProductDetailsComponent';
import './style.scss';

const ProductInformationComponent = (productInfo, swatchesData) => {
    const { breadcrumb: productBreadCrumbs } = productInfo;
    const productInformationContainer = document.createElement('div');
    productInformationContainer.className = 'product-information-container';

    productInformationContainer.appendChild(BreadCrumbComponent(productBreadCrumbs));
    productInformationContainer.appendChild(ProductDetailsComponent(productInfo, swatchesData));

    return productInformationContainer;
}
export default ProductInformationComponent;