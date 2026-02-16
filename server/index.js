import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/";

mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/api', route);
