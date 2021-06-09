import {ZammadTicketManager} from '../zammad/ticket.manager';
import {ZammadClient} from '../zammad/zammad.client';

export const zammadClient = new ZammadClient();
export const ticketManager = new ZammadTicketManager(zammadClient);
