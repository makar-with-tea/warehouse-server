import { db } from  './firebaseConfig';
import products from './exampleProducts.json';
import categories from './exampleCategories.json';

// Очистка данных в firestore
export const clearData = async () => {
  const batch = db.batch();
  const collections = ['products', 'categories'];

  for (const collection of collections) {
    const snapshot = await db.collection(collection).get();
    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
  }

  await batch.commit();
};

// Импорт данных из файлов в firestore
export const importData = async () => {
    try {
    
      const batch = db.batch();
  
      categories.forEach((cat: any) => {
        const docRef = db.collection('categories').doc(cat.id.toString()); // Automatically generate unique ID
        batch.set(docRef, cat);
      });

      products.forEach((product: any) => {
        const docRef = db.collection('products').doc(product.id.toString()); // Use the ID from the JSON file
        batch.set(docRef, product);
        }
        );
  
      await batch.commit();
      console.log('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error);
    }
  };
