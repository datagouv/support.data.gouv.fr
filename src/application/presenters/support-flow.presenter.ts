import { SupportFlow, UserChoices } from "../../domain/support/support-flow";

export const supportFlowPresenter = (
    supportFlow: SupportFlow,
    userChoices: UserChoices
): {
    supportFlow: SupportFlow;
    choicesPrefixes: string[];
    userPath: string;
} => {
    const choicesPrefixes = userChoices.map((_, index) =>
        userChoices.slice(0, index + 1).join("/")
    );
    const userPath = supportFlow.levels
        .map((level) => level.choices.find((choice) => choice.selected)?.label)
        .filter((label) => !!label)
        .join(" |> ");

    return {
        supportFlow,
        choicesPrefixes,
        userPath,
    };
};
