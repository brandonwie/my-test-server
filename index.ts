import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { attendanceData } from './attendanceData';

dotenv.config();

const app: Express = express();
app.use(cors());
const port = process.env.PORT;
const router = express.Router();

// app.get('/', (req, res) => {
//   console.log({ request: req });
//   res.status(200);
//   res.send({
//     code: 200,
//     message: 'Hello World!',
//     details: [],
//   });
// });

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/attendance/status-list', (req, res) => {
  console.log(req.body);
  res.send(attendanceData);
  res.sendStatus(200);
});

app.use(router);

app.listen(port, () => {
  console.log(`⚡️ %c Server is running on port ${port}`, 'color: #00ff00');
});
