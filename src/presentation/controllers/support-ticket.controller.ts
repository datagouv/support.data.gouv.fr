import { Request, Response } from "express";
import { SchemaOf, object, string, ValidationError } from "yup";
import { createSupportTicketUseCase } from "../../application/usecases/create-support-ticket.usecase";
import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { ticketManager } from "../../infrastructure/server/container";

export const createSupportTicket = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto = await validateRequest(req.body);
        await createSupportTicketUseCase(dto, ticketManager);
        res.render("frames/form.njk");
    } catch (err) {
        if (!(err instanceof ValidationError)) {
            res.render("frames/form.njk", {
                error: "Impossible de soumettre votre demande.",
            });
            return;
        }
        res.render("frames/form.njk", err);
    }
};

export const validateRequest = (body: unknown): Promise<CreateTicketDTO> => {
    const createSupportTicketSchema: SchemaOf<CreateTicketDTO> = object({
        author: string().defined().required().email(),
        recipient: string().defined().required().email(),
        subject: string().required().defined(),
        body: string().required().defined(),
    });

    return createSupportTicketSchema.validate(body, { abortEarly: false });
};
