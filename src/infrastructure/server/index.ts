import express from "express";
import nunjucks from "nunjucks";
import { attachControllersToApp } from "../../presentation/controllers";
import { port } from "../config";
import { manifest } from "./assets-manifest";

const app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

export const init = (): void => {
    app.use(express.static("public"));
    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use((_, res, next) => {
        res.locals.mainJs = manifest["main.js"];
        res.locals.mainCss = manifest["main.css"];
        next();
    });
    attachControllersToApp(app);

    app.listen(port);

    console.log(`App started, visit http://localhost:${port}`);
};
