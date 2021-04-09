import express from "express";
import nunjucks from "nunjucks";
import { displaySupportFlow } from "../../application/controllers/support-flow.controller";
import { port } from "../config";

const app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

export const init = () => {
    app.get("/", displaySupportFlow);
    app.listen(port);

    console.log(`App started, visit http://localhost:${port}`);
};
