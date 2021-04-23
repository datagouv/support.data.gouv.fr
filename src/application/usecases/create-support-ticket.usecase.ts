import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { TicketManager } from "../../domain/ticketing/ticket.manager";

export const createSupportTicketUseCase = (
    createTicketDTO: CreateTicketDTO,
    ticketManager: TicketManager
): Promise<void> => {
    return ticketManager.createTicket(createTicketDTO);
};
