import { NextFunction, Request, Response } from 'express';
import reservationService from '../services/reservationService.js';

export const initializeTable = (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = reservationService.initializeTable(req.body.tableCount);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const reserveTable = (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = reservationService.reserveTable(req.body.customerCount);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const message = reservationService.cancelReservation(req.body.bookingId);
    res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};
