import { NextFunction, Request, Response } from "express";
import { SchemaOf, object, string } from "yup";
import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";

export const validateTicketCreationRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await createSupportTicketSchema.validate(req.body, {
            abortEarly: false,
        });
        next();
    } catch (error) {
        next(error);
    }
};

const createSupportTicketSchema: SchemaOf<CreateTicketDTO> = object({
    author: string().defined().required().email(),
    recipient: string().defined().required().email(),
    subject: string().required().defined(),
    body: string().required().defined(),
});
