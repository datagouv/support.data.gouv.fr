import {Request, Response} from 'express';
import {validateTicketCreationRequest} from './ticket-creation-validation.middleware';

describe('The validation middleware', () => {
  const validBody = {
    author: 'jean@moust.fr',
    recipient: 'lol@lol.com',
    subject: 'Aled',
    body: "J'ai besoin d'aide",
    userPath: "Un particulier |> J'ai besoin d'aide mon pote",
    name: '',
  };

  it('passes a validation error when request body is invalid', async () => {
    const req = {
      body: {
        ...validBody,
        subject: undefined,
      },
    } as Request;
    const res = jest.fn() as unknown as Response;
    const next = jest.fn();

    await validateTicketCreationRequest(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next.mock.calls[0][0]).toMatchObject({
      message: '2 errors occurred',
    });
  });

  it('does nothing when the body is valid', async () => {
    const req = {
      body: validBody,
    } as Request;
    const res = jest.fn() as unknown as Response;
    const next = jest.fn();

    await validateTicketCreationRequest(req, res, next);

    expect(next).toBeCalledWith();
  });
});
