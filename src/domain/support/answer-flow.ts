import { Choice, ChoiceId, Question, Answer } from "./question-tree";

export type SelectableChoice = Omit<Choice, "link"> & {
    selected: boolean;
};

export type Level = Pick<Question, "title"> & {
    choices: SelectableChoice[];
};

export type UserChoices = ChoiceId[];

function linkIsAQuestion(link: Question | Answer): link is Question {
    return (link as Question).choices !== undefined;
}

export class AnswerFlow {
    readonly levels: Level[];
    readonly finalAnswer?: Answer;

    constructor(questionTree: Question, userChoices: UserChoices) {
        let finalAnswer: Answer | undefined = undefined;
        const setFinalAnswer = (answer: Answer) => (finalAnswer = answer);
        const levels = AnswerFlow.getLevelsFromSelectedNode(
            questionTree,
            userChoices,
            setFinalAnswer
        );
        this.levels = levels;
        this.finalAnswer = finalAnswer;
    }

    get isFullyFilled(): boolean {
        return this.finalAnswer !== undefined;
    }

    private static getLevelsFromSelectedNode(
        node: Question | Answer,
        userChoices: UserChoices,
        finalAnswerSetter: (answer: Answer) => void
    ): Level[] {
        if (!linkIsAQuestion(node)) {
            finalAnswerSetter(node);
            return [];
        }
        const selectedChoice = node.choices.find((choice) =>
            userChoices.includes(choice.id)
        );

        let subLevels: Level[] = [];

        const userHasMadeAChoice = selectedChoice !== undefined;

        if (userHasMadeAChoice) {
            subLevels = AnswerFlow.getLevelsFromSelectedNode(
                selectedChoice!.link,
                userChoices,
                finalAnswerSetter
            );
        }
        return [
            {
                title: node.title,
                choices: node.choices.map((choice) => ({
                    id: choice.id,
                    label: choice.label,
                    selected: userChoices.includes(choice.id),
                })),
            },
            ...subLevels,
        ];
    }
}
