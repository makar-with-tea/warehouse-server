// Интерфейс для продукта
export interface Product {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    quantity: number;
    imageUrl?: string;
    price: number;
}