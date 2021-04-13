import { Request, Response } from "express";
import { supportFlowPresenter } from "../../application/presenters/support-flow.presenter";
import { navigateSupportFlowUseCase } from "../../application/usecases/navigate-support-flow.usecase";
import { UserChoices } from "../../domain/support/support-flow";
import { questionTree } from "../../infrastructure/config";

export const navigateSupportFlow = (req: Request, res: Response): void => {
    const userChoices = req.path
        .split("/")
        .filter((chunck) => chunck !== "") as UserChoices;

    const supportFlow = navigateSupportFlowUseCase(questionTree, userChoices);

    res.render("index.nj", supportFlowPresenter(supportFlow, userChoices));
};
