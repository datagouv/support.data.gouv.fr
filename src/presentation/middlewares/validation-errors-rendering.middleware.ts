import { NextFunction, Request, Response } from "express";

export const renderValidationErrors = (
    err: Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    next();
};
