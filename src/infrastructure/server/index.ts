import express from "express";
import nunjucks from "nunjucks";
import { attachControllersToApp } from "../../presentation/controllers";
import { port } from "../config";
import { cachedManifest } from "./cached-manifest";

const app = express();
nunjucks.configure("views", {
    autoescape: true,
    express: app,
});

export const init = (): void => {
    app.use(express.static("public"));
    app.use((_, res, next) => {
        res.locals.mainJs = cachedManifest.mainJs;
        res.locals.mainCss = cachedManifest.mainCss;
        next();
    });
    attachControllersToApp(app);

    app.listen(port);

    console.log(`App started, visit http://localhost:${port}`);
};
