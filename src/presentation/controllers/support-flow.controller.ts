import { Request, Response } from "express";
import { navigateSupportFlowUseCase } from "../../application/usecases/navigate-support-flow.usecase";
import { ChoiceId } from "../../domain/support/question-tree";
import { UserChoices } from "../../domain/support/support-flow";
import { questionTree } from "../../infrastructure/config";

export const navigateSupportFlow = (req: Request, res: Response) => {
    const userChoices = req.path
        .split("/")
        .filter((chunck) => chunck !== "") as UserChoices;

    const supportFlow = navigateSupportFlowUseCase(questionTree, userChoices);

    const choicesPrefixes = userChoices.reduce(
        (choicesPrefixes: string[], userChoice, index) => {
            if (index === 0) {
                return [userChoice];
            }
            return [
                ...choicesPrefixes,
                choicesPrefixes[choicesPrefixes.length - 1] + "/" + userChoice,
            ];
        },
        []
    );

    res.render("index.nj", { supportFlow, choicesPrefixes });
};
