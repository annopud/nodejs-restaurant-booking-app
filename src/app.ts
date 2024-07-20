import express from 'express';
import reservationRouter from './routes/reservationRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', reservationRouter);

app.use(errorHandler);

export default app;
