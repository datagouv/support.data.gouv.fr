import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { TicketManager } from "../../domain/ticketing/ticket.manager";
import { ZammadClient } from "./zammad.client";

export class ZammadTicketManager implements TicketManager {
    constructor(private readonly zammadClient: ZammadClient) {}

    createTicket(createTicket: CreateTicketDTO): Promise<void> {
        return this.zammadClient.createTicket(
            createTicket.author,
            createTicket.recipient,
            createTicket.subject,
            createTicket.body
        );
    }
}
