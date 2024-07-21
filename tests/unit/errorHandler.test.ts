import { NextFunction, Request } from 'express';
import { InitializationError } from '../../src/errors/InitializationError.js';
import errorHandler from '../../src/middlewares/errorHandler.js';
import { expect, jest, test } from '@jest/globals';
import { InvalidInputError } from '../../src/errors/InvalidInputError.js';
import { NotFoundError } from '../../src/errors/NotFoundError.js';
import { ReservationError } from '../../src/errors/ReservationError.js';

describe('ReservationService', () => {
  let req: Request, res: any, next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  test("should get an error 'Invalid input.'", async () => {
    errorHandler(new InvalidInputError('Invalid input.'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input.' });
  });
  test("should get an error 'Tables have not been initialized.'", async () => {
    errorHandler(new InitializationError('Tables have not been initialized.'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Tables have not been initialized.' });
  });

  test("should get an error 'Not Found'", async () => {
    errorHandler(new NotFoundError('Not Found'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
  });

  test("should get an error 'Not enough tables available.'", async () => {
    errorHandler(new ReservationError('Not enough tables available.'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not enough tables available.' });
  });

  test("should get an error 'Something went wrong.'", async () => {
    errorHandler(new Error('Something went wrong.'), req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong.' });
  });
});
