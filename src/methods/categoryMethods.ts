import { Request, Response } from 'express';
import { db } from '../utils/firebaseConfig';
import { Category } from '../models/Category';

const categoriesCollection = db.collection('categories');

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, id, allowedGroups } = req.body;
    if (!name || !allowedGroups) {
      return res.status(400).json({ message: 'Name and allowedGroups are required' });
    }
    const category: Category = { name, id, allowedGroups };
    const docRef = await categoriesCollection.doc(id.toString()).set(category);
    res.status(201).json({ ...category, id: docRef.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const snapshot = await categoriesCollection.get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, allowedGroups } = req.body;
    if (!name || !allowedGroups) {
      return res.status(400).json({ message: 'Name and allowedGroups are required' });
    }

    const docRef = categoriesCollection.doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = doc.data() as Category;
    const userGroup = req.user?.group;
    if (!userGroup) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (userGroup !== 'admin' && !category.allowedGroups.includes(userGroup)) {
      return res.status(403).json({ message: 'You do not have permission to update this category' });
    }

    const updatedCategory = { name, allowedGroups };
    await docRef.update(updatedCategory);
    const updatedDoc = await docRef.get();
    res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const docRef = categoriesCollection.doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const category = doc.data() as Category;
    const userGroup = req.user?.group;
    if (!userGroup) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (userGroup !== 'admin' && !category.allowedGroups.includes(userGroup)) {
      return res.status(403).json({ message: 'You do not have permission to delete this category' });
    }

    await docRef.delete();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};