import { Choice, ChoiceId, Question, QuestionTitle } from "./question-tree";

export type SelectableChoice = Omit<Choice, "link"> & {
    selected: boolean;
};

export type Level = Pick<Question, "title"> & {
    choices: SelectableChoice[];
};

export type UserChoices = ChoiceId[];

export class AnswerFlow {
    private constructor(public readonly levels: Level[]) {}

    static fromQuestionTreeAndUserChoices(
        questionTree: Question,
        userChoices: UserChoices
    ): AnswerFlow {
        return new this([
            {
                title: questionTree.title,
                choices: questionTree.choices.map((choice) => ({
                    ...choice,
                    selected: userChoices.includes(choice.id),
                })),
            },
        ]);
    }
}
