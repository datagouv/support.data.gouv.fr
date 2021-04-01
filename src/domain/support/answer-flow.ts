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
        const { levels, finalAnswer } = AnswerFlow.getLevelsFromQuestionTree(
            questionTree,
            userChoices
        );
        this.levels = levels;
        this.finalAnswer = finalAnswer;
    }

    private static getLevelsFromQuestionTree(
        questionTree: Question | Answer,
        userChoices: UserChoices,
        finalAnswer?: Answer
    ): { levels: Level[]; finalAnswer?: Answer } {
        if (!linkIsAQuestion(questionTree)) {
            return { levels: [], finalAnswer: questionTree };
        }
        const selectedChoice = questionTree.choices.find((choice) =>
            userChoices.includes(choice.id)
        );

        if (selectedChoice) {
            const {
                levels,
                finalAnswer: nextFinalAnswer,
            } = this.getLevelsFromQuestionTree(
                selectedChoice.link,
                userChoices,
                finalAnswer
            );
            return {
                levels: [
                    {
                        title: questionTree.title,
                        choices: questionTree.choices.map((choice) => ({
                            id: choice.id,
                            label: choice.label,
                            selected: userChoices.includes(choice.id),
                        })),
                    },
                    ...levels,
                ],
                finalAnswer: nextFinalAnswer,
            };
        }
        return {
            levels: [
                {
                    title: questionTree.title,
                    choices: questionTree.choices.map((choice) => ({
                        id: choice.id,
                        label: choice.label,
                        selected: false,
                    })),
                },
            ],
            finalAnswer,
        };
    }
}
