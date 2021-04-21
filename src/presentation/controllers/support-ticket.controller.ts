import { Request, Response } from "express";
import { SchemaOf, object, string } from "yup";
import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";

export const createSupportTicket = async (
    req: Request,
    res: Response
): Promise<void> => {
    // To fill
};

export const validateRequest = (body: unknown) => {
    const createSupportTicketSchema: SchemaOf<CreateTicketDTO> = object({
        author: string().defined().required().email(),
        recipient: string().defined().required().email(),
        subject: string().required().defined(),
        body: string().required().defined(),
    });

    return createSupportTicketSchema.validate(body);
};
