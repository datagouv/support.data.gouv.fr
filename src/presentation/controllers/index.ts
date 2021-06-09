import {Application} from 'express';
import {validateTicketCreationRequest} from '../middlewares/ticket-creation-validation.middleware';
import {renderValidationErrors} from '../middlewares/validation-errors-rendering.middleware';
import {navigateSupportFlow} from './support-flow.controller';
import {createSupportTicket, thankYou} from './support-ticket.controller';

export const attachControllersToApp = (app: Application): void => {
  app.use('/tickets', validateTicketCreationRequest);
  app.use('/tickets', renderValidationErrors);
  app.post('/tickets', createSupportTicket);
  app.get('/merci', thankYou);
  app.get('/(*)?', navigateSupportFlow);
};
