import {Request, Response} from 'express';

const useCaseMock = jest.fn();
jest.mock('../../application/usecases/create-support-ticket.usecase', () => ({
  createSupportTicketUseCase: useCaseMock,
}));

import {createSupportTicket} from './support-ticket.controller';

describe('The support ticket controller', () => {
  const validBody = {
    author: 'jean@moust.fr',
    recipient: 'lol@lol.com',
    subject: 'Aled',
    body: "J'ai besoin d'aide",
    name: '',
  };

  it('exists', () => {
    expect(createSupportTicket).toBeDefined();
  });

  it('renders a success when input is correct and ticket is created', async () => {
    const req = {
      body: validBody,
    } as Request;
    const res = {
      redirect: jest.fn(),
    } as unknown as Response;
    useCaseMock.mockResolvedValue(undefined);

    await createSupportTicket(req, res);

    expect(res.redirect).toHaveBeenCalledWith(303, '/merci');
  });

  it('renders an error when input is correct ticket creation fails', async () => {
    const req = {
      body: validBody,
    } as Request;
    const res = {
      status: jest.fn(),
      type: jest.fn(),
      render: jest.fn(),
    } as unknown as Response;
    useCaseMock.mockRejectedValue(undefined);

    await createSupportTicket(req, res);

    expect(res.status).toHaveBeenCalledWith(502);
    expect(res.render).toHaveBeenCalledTimes(1);
    expect(res.type).toHaveBeenCalledWith('text/vnd.turbo-stream.html');
    expect(res.render).toHaveBeenCalledWith('includes/form/stream.njk', {
      error: 'Impossible de soumettre votre demande.',
      userInput: validBody,
    });
  });

  it('handles bots trap', async () => {
    const req = {
      body: {...validBody, name: 'Boty MacBotname'},
    } as Request;
    const res = {
      redirect: jest.fn(),
    } as unknown as Response & jest.Mocked<Response>;

    await createSupportTicket(req, res);

    expect(res.redirect).toHaveBeenCalledWith(303, '/');
  });
});
