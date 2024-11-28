import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './router';
import { seedCategories } from './db/categories';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', router);

const server = http.createServer(app);

const startServer = async () => {
  try {
    console.log('Seeding categories...');
    await seedCategories();
    console.log('Categories seeded successfully.');

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error initializing server:', error);
    process.exit(1);
  }
};

startServer();
