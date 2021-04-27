import { Request, Response } from "express";
import { ValidationError } from "yup";
import { renderValidationErrors } from "./validation-errors-rendering.middleware";

describe("The validation errors rendering middleware", () => {
    const req = {
        body: Symbol(),
    } as Request;
    const res = ({
        render: jest.fn(),
        status: jest.fn(),
        type: jest.fn(),
    } as unknown) as Response;
    const next = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("does nothing if there is no validation error", () => {
        const error = undefined;

        renderValidationErrors(error, req, res, next);

        expect(next).toBeCalledWith();
    });

    it("renders the turbo streams with validation errors", () => {
        const error = new ValidationError([
            new ValidationError(
                "c'est pas valide frère",
                "pas valide",
                "croute"
            ),
            new ValidationError(
                "une autre erreur sur le champ croute",
                "pas valide",
                "croute"
            ),
        ]);

        renderValidationErrors(error, req, res, next);

        expect(next).not.toBeCalled();
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.type).toHaveBeenCalledWith("text/vnd.turbo-stream.html");
        expect(res.render).toBeCalledWith("includes/form/stream.njk", {
            userInput: req.body,
            error: {
                fieldsInError: ["croute"],
            },
        });
    });
});
