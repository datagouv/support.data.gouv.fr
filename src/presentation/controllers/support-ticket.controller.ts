import { Request, Response } from "express";
import { SchemaOf, object, string, ValidationError } from "yup";
import { createSupportTicketUseCase } from "../../application/usecases/create-support-ticket.usecase";
import { CreateTicketDTO } from "../../domain/ticketing/create-ticket.dto";
import { ticketManager } from "../../infrastructure/server/container";

export const createSupportTicket = async (
    req: Request,
    res: Response
): Promise<void> => {
    if (req.body.name !== "") {
        res.redirect(303, "/");
        return;
    }

    const userInput = req.body;
    let error = undefined;
    try {
        const dto = await validateRequest(req.body);
        await createSupportTicketUseCase(dto, ticketManager);
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(422);
            error = presentValidationError(err);
            res.render("includes/form.njk", { userInput, error });
            return;
        } else {
            res.status(502);
            error = "Impossible de soumettre votre demande.";
            res.render("includes/form.njk", { userInput, error });
            return;
        }
    }
    res.redirect(303, "/merci");
};

export const thankYou = (req: Request, res: Response): void => {
    res.render("thank-you.njk");
};

const createSupportTicketSchema: SchemaOf<CreateTicketDTO> = object({
    author: string().defined().required().email(),
    recipient: string().defined().required().email(),
    subject: string().required().defined(),
    body: string().required().defined(),
});

export const validateRequest = (body: unknown): Promise<CreateTicketDTO> => {
    return createSupportTicketSchema.validate(body, { abortEarly: false });
};

type FieldsValidationError = {
    fieldsInError: string[];
};

export const presentValidationError = (
    validationError: ValidationError
): FieldsValidationError => {
    return validationError.inner.reduce(
        (errorMap, error) => {
            if (error.path == undefined) {
                return errorMap;
            }
            return {
                fieldsInError: [...errorMap.fieldsInError, error.path],
            };
        },
        { fieldsInError: [] } as FieldsValidationError
    );
};
