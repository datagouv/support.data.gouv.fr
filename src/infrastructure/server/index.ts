import express from "express";
import nunjucks from "nunjucks";
import { attachControllersToApp } from "../../presentation/controllers";
import { port } from "../config";

const app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

export const init = () => {
    app.use(express.static("public"));
    attachControllersToApp(app);

    app.listen(port);

    console.log(`App started, visit http://localhost:${port}`);
};
