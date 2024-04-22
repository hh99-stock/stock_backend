import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import setupWebSocketServer from './utils/dataProcesser/dataProcesser.js';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

setupWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`${PORT} 포트로 소켓 서버가 열렸어요!`);
});