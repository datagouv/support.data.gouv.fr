import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { TicketManager } from "../../domain/ticketing/ticket.manager";
import { ZammadClient } from "./zammad.client";

export class ZammadTicketManager implements TicketManager {
    constructor(private readonly zammadClient: ZammadClient) {}

    createTicket(createTicket: CreateTicketDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
