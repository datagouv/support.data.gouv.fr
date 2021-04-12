import { SupportFlow, UserChoices } from "../../domain/support/support-flow";

export const supportFlowPresenter = (
    supportFlow: SupportFlow,
    userChoices: UserChoices
) => {
    const choicesPrefixes = userChoices.map((_, index) =>
        userChoices.slice(0, index + 1).join("/")
    );
    return {
        supportFlow,
        choicesPrefixes,
    };
};
