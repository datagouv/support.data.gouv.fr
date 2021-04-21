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
});
