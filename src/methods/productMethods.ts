import { Request, Response } from 'express';
import { db } from '../utils/firebaseConfig';
import { Product } from '../models/product';

const productsCollection = db.collection('products');

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, description, categoryId, quantity, imageUrl, price } = req.body;
    if (!id || !name || !description || categoryId == null || quantity == null || price == null) { // imageUrl опциональна, как было в предыдущих дз
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (quantity < 0 || price < 0) {
        return res.status(400).json({ message: 'Quantity and price must be positive numbers' });
    }
    const product: Product = { id, name, description, categoryId, quantity, imageUrl, price };
    const docRef = await productsCollection.doc(id.toString()).set(product);
    res.status(201).json({ ...product, id: docRef.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { limit = -1, offset = 0 } = req.query;
    if (parseInt(limit.toString()) > 0) {
        const snapshot = await productsCollection.limit(Number(limit)).offset(Number(offset)).get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
    } else {
        const snapshot = await productsCollection.get();
        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const doc = await productsCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id, name, description, categoryId, quantity, price, imageUrl } = req.body;
        const docRef = productsCollection.doc(req.params.id);
        const doc = await docRef.get();
    
        if (!doc.exists) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const updatedData: Partial<Product> = {};
        if (name !== undefined) updatedData.name = name;
        if (description !== undefined) updatedData.description = description;
        if (categoryId !== undefined) updatedData.categoryId = categoryId;
        if (quantity !== undefined) updatedData.quantity = quantity;
        if (price !== undefined) updatedData.price = price;
        if (imageUrl !== undefined) updatedData.imageUrl = imageUrl;
    
        await docRef.update(updatedData);
        const updatedDoc = await docRef.get();
        res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
  };

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const docRef = productsCollection.doc(req.params.id);
    await docRef.delete();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};