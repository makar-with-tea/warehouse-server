import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../methods/categoryMethods';

export const categoryController = {
    getCategories: getCategories,
    getCategoryById: getCategoryById,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}