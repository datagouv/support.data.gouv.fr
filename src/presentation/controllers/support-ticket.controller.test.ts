import { Request, Response } from "express";
import { ValidationError } from "yup";

const useCaseMock = jest.fn();
jest.mock("../../application/usecases/create-support-ticket.usecase", () => ({
    createSupportTicketUseCase: useCaseMock,
}));

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

    it("renders a success when input is correct and ticket is created", async () => {
        const req = {
            body: {
                author: "jean@moust.fr",
                recipient: "lol@lol.com",
                subject: "Aled",
                body: "J'ai besoin d'aide",
            },
        } as Request;
        const res = ({
            render: jest.fn(),
        } as unknown) as Response & jest.Mocked<Response>;
        useCaseMock.mockResolvedValue(undefined);

        await createSupportTicket(req, res);

        expect(res.render).toHaveBeenCalledWith("frames/form.njk");
    });

    it("renders an error when input is correct ticket creation fails", async () => {
        const req = {
            body: {
                author: "jean@moust.fr",
                recipient: "lol@lol.com",
                subject: "Aled",
                body: "J'ai besoin d'aide",
            },
        } as Request;
        const res = ({
            render: jest.fn(),
        } as unknown) as Response & jest.Mocked<Response>;
        useCaseMock.mockRejectedValue(undefined);

        await createSupportTicket(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith("frames/form.njk", {
            error: "Impossible de soumettre votre demande.",
        });
    });
});
