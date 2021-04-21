import {
    createSupportTicket,
    validateRequest,
} from "./support-ticket.controller";

describe("The support ticket controller", () => {
    it("exists", () => {
        expect(createSupportTicket).toBeDefined();
    });

    it("has a request validation function", () => {
        expect(validateRequest).toBeDefined();
    });
});
