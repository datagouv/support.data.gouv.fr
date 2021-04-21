import { Request, Response } from "express";
import { ValidationError } from "yup";
import {
    createSupportTicket,
    validateRequest,
} from "./support-ticket.controller";

describe("The support ticket controller", () => {
    it("exists", () => {
        expect(createSupportTicket).toBeDefined();
    });

    it("has a request validation function", () => {
        expect(
            validateRequest({
                author: "jean@moust.fr",
                recipient: "lol",
                subject: "Aled",
                body: "J'ai besoin d'aide",
            })
        ).rejects.toThrow("recipient must be a valid email");
    });

    it("renders validation errors", async () => {
        const req = {
            body: {
                author: "jean@moust.fr",
                recipient: "lol",
                body: "J'ai besoin d'aide",
            },
        } as Request;
        const res = ({
            render: jest.fn(),
        } as unknown) as Response & jest.Mocked<Response>;

        await createSupportTicket(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render.mock.calls[0][0]).toEqual("frames/form.njk");
        expect(res.render.mock.calls[0][1]).toBeInstanceOf(ValidationError);
    });
});
