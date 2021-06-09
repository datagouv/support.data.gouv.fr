import {CreateTicketDTO} from './create-ticket.dto';

export interface TicketManager {
  createTicket(createTicket: CreateTicketDTO): Promise<void>;
}
