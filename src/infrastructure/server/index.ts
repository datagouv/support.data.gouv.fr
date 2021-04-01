import express from "express";
import { displaySupportFlow } from "../../application/controllers/support-flow.controller";
import { port } from "../config";

const app = express();

export const init = () => {
    app.get("/", displaySupportFlow);
    app.listen(port);
};
