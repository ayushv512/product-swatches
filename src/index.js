import fetchProductSwatches from './services/ProductSwatchesService';

document.addEventListener("DOMContentLoaded", function(event) {
    fetchProductSwatches();
    window.localStorage.setItem("cartData", JSON.stringify({}));
});
