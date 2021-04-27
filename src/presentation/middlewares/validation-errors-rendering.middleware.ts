import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export const renderValidationErrors = (
    error: Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (!(error instanceof ValidationError)) {
        next();
        return;
    }
    res.render("includes/form/stream.njk", {
        userInput: req.body,
        error: presentValidationError(error),
    });
    res.status(422);
    res.type("text/vnd.turbo-stream.html");
};

type FieldsValidationError = {
    fieldsInError: string[];
};

export const presentValidationError = (
    validationError: ValidationError
): FieldsValidationError => {
    return validationError.inner.reduce(
        (errorMap, error) => {
            if (error.path == undefined) {
                return errorMap;
            }
            return {
                fieldsInError: [...errorMap.fieldsInError, error.path],
            };
        },
        { fieldsInError: [] } as FieldsValidationError
    );
};
