import {createProduct, 
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../methods/productMethods';

export const productController = {
    getProducts: getProducts,
    getProductById: getProductById,
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}