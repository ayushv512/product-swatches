const BreadCrumbComponent = (productBreadCrumbs) => {
    const breadCrumbElement = document.createElement('div');
    const breadCrumbValue = productBreadCrumbs.map(a => a.toUpperCase()).join(' > ');

    breadCrumbElement.className = 'breadcrumb-container';
    breadCrumbElement.innerText = breadCrumbValue;

    return breadCrumbElement;
}

export default BreadCrumbComponent;