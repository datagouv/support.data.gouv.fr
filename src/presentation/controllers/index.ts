import { Application } from "express";
import { navigateSupportFlow } from "./support-flow.controller";

export const attachControllersToApp = (app: Application): void => {
    app.get("/", navigateSupportFlow);
};
