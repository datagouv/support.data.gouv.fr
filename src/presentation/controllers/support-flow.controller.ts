import { Request, Response } from "express";
import { navigateSupportFlowUseCase } from "../../application/usecases/navigate-support-flow.usecase";
import { ChoiceId } from "../../domain/support/question-tree";
import { questionTree } from "../../infrastructure/config";

export const navigateSupportFlow = (req: Request, res: Response) => {
    const supportFlow = navigateSupportFlowUseCase(questionTree, [
        "choice1_1" as ChoiceId,
    ]);

    res.render("index.nj", { supportFlow });
};
