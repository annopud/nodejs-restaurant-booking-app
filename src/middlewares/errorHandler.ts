import { NextFunction, Request, Response } from "express";
import { InvalidInputError } from "../errors/InvalidInputError.js";
import { InitializationError } from "../errors/InitializationError.js";
import { ReservationError } from "../errors/ReservationError.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof InvalidInputError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof InitializationError || err instanceof ReservationError) {
    return res.status(409).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });
};

export default errorHandler;
