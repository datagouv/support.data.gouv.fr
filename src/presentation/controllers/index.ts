import { Application } from "express";
import { navigateSupportFlow } from "./support-flow.controller";
import { createSupportTicket } from "./support-ticket.controller";

export const attachControllersToApp = (app: Application): void => {
    app.post("/tickets", createSupportTicket);
    app.get("/(*)?", navigateSupportFlow);
};
