import { Request, Response } from "express";
import { createSupportTicketUseCase } from "../../application/usecases/create-support-ticket.usecase";
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
    try {
        await createSupportTicketUseCase(userInput, ticketManager);
    } catch (err) {
        res.status(502);
        res.type("text/vnd.turbo-stream.html");
        const error = "Impossible de soumettre votre demande.";
        res.render("includes/form/stream.njk", { userInput, error });
        return;
    }
    res.redirect(303, "/merci");
};

export const thankYou = (req: Request, res: Response): void => {
    res.render("thank-you.njk");
};
