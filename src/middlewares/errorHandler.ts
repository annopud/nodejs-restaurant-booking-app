import { NextFunction, Request, Response } from 'express';
import { InvalidInputError } from '../errors/InvalidInputError.js';
import { InitializationError } from '../errors/InitializationError.js';
import { ReservationError } from '../errors/ReservationError.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof InvalidInputError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof InitializationError || err instanceof ReservationError) {
    return res.status(409).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  return res.status(500).json({ error: err.message });
};

export default errorHandler;
