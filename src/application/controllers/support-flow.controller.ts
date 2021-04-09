import { Request, Response } from "express";

export const displaySupportFlow = (req: Request, res: Response) => {
    res.render("index.html");
};
