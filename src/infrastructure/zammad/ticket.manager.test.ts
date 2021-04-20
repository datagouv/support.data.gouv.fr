import { ZammadTicketManager } from "./ticket.manager";

describe("The Zammad ticket manager", () => {
    const clientMock = {
        createUser: jest.fn(),
        createTicket: jest.fn(),
    };
    it("exists", () => {
        expect(ZammadTicketManager).toBeDefined();
    });

    it("uses the zammad client", () => {
        const zammadTickerManager = new ZammadTicketManager(clientMock);
        expect(zammadTickerManager).toBeDefined();
    });
});
