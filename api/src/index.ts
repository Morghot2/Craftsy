import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
