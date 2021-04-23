import { Request, Response } from "express";

const useCaseMock = jest.fn();
jest.mock("../../application/usecases/create-support-ticket.usecase", () => ({
    createSupportTicketUseCase: useCaseMock,
}));

import {
    createSupportTicket,
    validateRequest,
} from "./support-ticket.controller";

describe("The support ticket controller", () => {
    const validBody = {
        author: "jean@moust.fr",
        recipient: "lol@lol.com",
        subject: "Aled",
        body: "J'ai besoin d'aide",
        name: "",
    };

    it("exists", () => {
        expect(createSupportTicket).toBeDefined();
    });

    it("has a request validation function", () => {
        expect(
            validateRequest({
                ...validBody,
                recipient: "lol",
            })
        ).rejects.toThrow("recipient must be a valid email");
    });

    it("renders validation errors", async () => {
        const req = {
            body: { ...validBody, subject: undefined },
        } as Request;
        const res = ({
            render: jest.fn(),
            status: jest.fn(),
        } as unknown) as Response & jest.Mocked<Response>;

        await createSupportTicket(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render.mock.calls[0][0]).toEqual("frames/form.njk");
        expect(res.render.mock.calls[0][1]).toHaveProperty("error");
        expect(res.render.mock.calls[0][1]).toMatchObject({
            error: {
                message: "2 errors occurred",
            },
        });
    });

    it("renders a success when input is correct and ticket is created", async () => {
        const req = {
            body: validBody,
        } as Request;
        const res = ({
            redirect: jest.fn(),
        } as unknown) as Response;
        useCaseMock.mockResolvedValue(undefined);

        await createSupportTicket(req, res);

        expect(res.redirect).toHaveBeenCalledWith(303, "/merci");
    });

    it("renders an error when input is correct ticket creation fails", async () => {
        const req = {
            body: validBody,
        } as Request;
        const res = ({
            status: jest.fn(),
            render: jest.fn(),
        } as unknown) as Response;
        useCaseMock.mockRejectedValue(undefined);

        await createSupportTicket(req, res);

        expect(res.status).toHaveBeenCalledWith(502);
        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith("frames/form.njk", {
            error: "Impossible de soumettre votre demande.",
            userInput: validBody,
        });
    });

    it("handles bots trap", async () => {
        const req = {
            body: { ...validBody, name: "Boty MacBotname" },
        } as Request;
        const res = ({
            redirect: jest.fn(),
        } as unknown) as Response & jest.Mocked<Response>;

        await createSupportTicket(req, res);

        expect(res.redirect).toHaveBeenCalledWith(303, "/");
    });
});
