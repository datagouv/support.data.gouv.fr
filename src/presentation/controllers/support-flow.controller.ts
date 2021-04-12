import { Request, Response } from "express";
import { navigateSupportFlowUseCase } from "../../application/usecases/navigate-support-flow.usecase";
import { questionTree } from "../../infrastructure/config";

export const navigateSupportFlow = (req: Request, res: Response) => {
    const supportFlow = navigateSupportFlowUseCase(questionTree, []);

    res.render("index.nj", { supportFlow });
};
