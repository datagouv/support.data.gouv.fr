import { Application } from "express";
import { navigateSupportFlow } from "./support-flow.controller";
import { createSupportTicket, thankYou } from "./support-ticket.controller";

export const attachControllersToApp = (app: Application): void => {
    app.post("/tickets", createSupportTicket);
    app.get("/merci", thankYou);
    app.get("/(*)?", navigateSupportFlow);
};
