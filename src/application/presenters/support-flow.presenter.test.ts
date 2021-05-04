import * as path from "path";
import { Question } from "../../domain/support/question-tree";
import { SupportFlow, UserChoices } from "../../domain/support/support-flow";
import { buildQuestionTree } from "../../infrastructure/config/question-tree.factory";
import { supportFlowPresenter } from "./support-flow.presenter";

describe("The support flow presenter", () => {
    it("does not change the support flow", () => {
        const inputSupportFlow = ({ levels: [] } as unknown) as SupportFlow;
        const inputUserChoices = [] as UserChoices;

        const { supportFlow } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );
        expect(supportFlow).toBe(inputSupportFlow);
    });

    it("returns an empty prefix array when no user choice is made", () => {
        const inputSupportFlow = ({ levels: [] } as unknown) as SupportFlow;
        const inputUserChoices = [] as UserChoices;

        const { choicesPrefixes } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );
        expect(choicesPrefixes).toHaveLength(0);
    });

    it("returns a choice url prefix array when provided with user choices", () => {
        const inputSupportFlow = ({ levels: [] } as unknown) as SupportFlow;
        const inputUserChoices = ["croute", "yolo", "moustaki"] as UserChoices;

        const { choicesPrefixes } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );

        expect(choicesPrefixes).toEqual([
            "croute",
            "croute/yolo",
            "croute/yolo/moustaki",
        ]);
    });

    it("returns the user choices as a text to include in the tickets", () => {
        const questionTree = buildQuestionTree(
            path.resolve(
                __dirname,
                "..",
                "..",
                "infrastructure",
                "config",
                "__tests__"
            )
        );
        const inputUserChoices = [
            questionTree.choices[0].id,
            (questionTree.choices[0].link as Question).choices[0].id,
        ];
        const inputSupportFlow = new SupportFlow(
            questionTree,
            inputUserChoices
        );

        const { userPath } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );

        expect(userPath).toEqual(
            "Un particulier |> J'ai une question relative à des données à caractère personnel"
        );
    });
});
