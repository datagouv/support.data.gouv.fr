import {CreateTicketDTO} from '../../domain/ticketing/create-ticket.dto';
import {ZammadTicketManager} from './ticket.manager';

describe('The Zammad ticket manager', () => {
  const clientMock = {
    createUser: jest.fn(),
    createTicket: jest.fn(),
  };
  it('exists', () => {
    expect(ZammadTicketManager).toBeDefined();
  });

  it('uses the zammad client', () => {
    const zammadTickerManager = new ZammadTicketManager(clientMock);
    expect(zammadTickerManager).toBeDefined();

    const createTicketDTO: CreateTicketDTO = {
      body: "J'ai grandement besoin d'aide",
      recipient: 'support@data.gouv.fr',
      subject: 'Aled',
      author: 'georges@moustaki.fr',
      userPath: 'Un particulier |> Aled',
    };

    zammadTickerManager.createTicket(createTicketDTO);

    const computedBody = `Parcours utilisateur : ${createTicketDTO.userPath}\n\n${createTicketDTO.body}`;

    expect(clientMock.createTicket).toBeCalledWith(
      createTicketDTO.author,
      createTicketDTO.recipient,
      createTicketDTO.subject,
      computedBody
    );
  });
});
