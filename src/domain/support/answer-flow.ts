import {
    Choice,
    ChoiceId,
    Question,
    Answer,
    QuestionTitle,
} from "./question-tree";

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
    private constructor(public readonly levels: Level[]) {}

    static fromQuestionTreeAndUserChoices(
        questionTree: Question,
        userChoices: UserChoices
    ): AnswerFlow {
        const levels = this.getLevelsFromQuestionTree(
            questionTree,
            userChoices
        );

        return new this(levels);
    }

    private static getLevelsFromQuestionTree(
        questionTree: Question | Answer,
        userChoices: UserChoices
    ): Level[] {
        if (!linkIsAQuestion(questionTree)) {
            return [];
        }
        const selectedChoice = questionTree.choices.find((choice) =>
            userChoices.includes(choice.id)
        );

        if (selectedChoice) {
            return [
                {
                    title: questionTree.title,
                    choices: questionTree.choices.map((choice) => ({
                        id: choice.id,
                        label: choice.label,
                        selected: userChoices.includes(choice.id),
                    })),
                },
                ...this.getLevelsFromQuestionTree(
                    selectedChoice.link,
                    userChoices
                ),
            ];
        }
        return [
            {
                title: questionTree.title,
                choices: questionTree.choices.map((choice) => ({
                    id: choice.id,
                    label: choice.label,
                    selected: false,
                })),
            },
        ];
    }
}
