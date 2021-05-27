import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectMongoose } from './config/db.js';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import inventoryRoutes from './routes/inventory.routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

connectMongoose();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/inventory', inventoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});