import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { TicketManager } from "../../domain/ticketing/ticket.manager";

export class ZammadTicketManager implements TicketManager {
    createTicket(createTicket: CreateTicketDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
