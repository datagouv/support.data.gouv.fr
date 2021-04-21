import { Request, Response } from "express";
import { SchemaOf, object, string, ValidationError } from "yup";
import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";

export const createSupportTicket = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const dto = await validateRequest(req.body);
    } catch (err) {
        if (!(err instanceof ValidationError)) {
            throw err;
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
