import { SupportFlow, UserChoices } from "../../domain/support/support-flow";
import { supportFlowPresenter } from "./support-flow.presenter";

describe("The support flow presenter", () => {
    it("does not change the support flow", () => {
        const inputSupportFlow = (jest.fn() as unknown) as SupportFlow;
        const inputUserChoices = [] as UserChoices;

        const { supportFlow } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );
        expect(supportFlow).toBe(inputSupportFlow);
    });

    it("returns an empty prefix array when no user choice is made", () => {
        const inputSupportFlow = (jest.fn() as unknown) as SupportFlow;
        const inputUserChoices = [] as UserChoices;

        const { choicesPrefixes } = supportFlowPresenter(
            inputSupportFlow,
            inputUserChoices
        );
        expect(choicesPrefixes).toHaveLength(0);
    });

    it("returns a choice url prefix array when provided with user choices", () => {
        const inputSupportFlow = (jest.fn() as unknown) as SupportFlow;
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
});
