import { Request, Response } from "express";

export const navigateSupportFlow = (req: Request, res: Response) => {
    res.render("index.nj");
};
