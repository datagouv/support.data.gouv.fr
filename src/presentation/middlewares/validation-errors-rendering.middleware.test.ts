import { Request, Response } from "express";
import { renderValidationErrors } from "./validation-errors-rendering.middleware";

describe("The validation errors rendering middleware", () => {
    it("does nothing if there is no validation error", () => {
        const error = undefined;
        const req = (jest.fn() as unknown) as Request;
        const res = (jest.fn() as unknown) as Response;
        const next = jest.fn();

        renderValidationErrors(error, req, res, next);

        expect(next).toBeCalledWith();
    });
});
