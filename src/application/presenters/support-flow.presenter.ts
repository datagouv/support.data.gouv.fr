import { SupportFlow, UserChoices } from "../../domain/support/support-flow";

export const supportFlowPresenter = (
    supportFlow: SupportFlow,
    userChoices: UserChoices
) => {
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
    return {
        supportFlow,
        choicesPrefixes,
    };
};
