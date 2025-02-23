import { Request, Response } from 'express';
import { db } from '../utils/firebaseConfig';
import { Category } from '../models/category';

const categoriesCollection = db.collection('categories');

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, id } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const category: Category = { name, id };
    const docRef = await categoriesCollection.doc(id.toString()).set(category);
    res.status(201).json({ ...category, id: docRef.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const snapshot = await categoriesCollection.get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const doc = await categoriesCollection.doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }
    const category = { name };
    const docRef = categoriesCollection.doc(req.params.id);
    await docRef.update(category);
    const updatedDoc = await docRef.get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const docRef = categoriesCollection.doc(req.params.id);
    await docRef.delete();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};