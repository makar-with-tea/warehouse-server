import express from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import cors from 'cors';
import { errorHandler } from './utils/errorHandler';
import { logger } from './utils/logger';
import authRoutes from './routes/authRoutes';
// import { clearData, importData } from './utils/updateDB';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(errorHandler);
app.use(logger);

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// clearData().catch(console.error);
// importData().catch(console.error);