import { AnswerFlow, UserChoices } from "./answer-flow";
import { ChoiceId, Question, QuestionTitle } from "./question-tree";

describe("Answer flow", () => {
    describe("For a valid question tree", () => {
        const firstUserChoice = "choice1" as ChoiceId;
        const questionTree: Question = {
            title: "First question" as QuestionTitle,
            choices: [
                {
                    id: firstUserChoice,
                    label: "Choice 1",
                    link: {
                        title: "Second question" as QuestionTitle,
                        choices: [
                            {
                                id: "choice3" as ChoiceId,
                                label: "Choice 3",
                                link: {
                                    content: "Content 3",
                                },
                            },
                        ],
                    },
                },
                {
                    id: "choice2" as ChoiceId,
                    label: "Choice 2",
                    link: {
                        content: "Content 1",
                    },
                },
            ],
        };
        const userChoices: UserChoices = [firstUserChoice];

        const answerFlow = AnswerFlow.fromQuestionTreeAndUserChoices(
            questionTree,
            userChoices
        );

        it("has one more level than user choices count", () => {
            expect(answerFlow.levels).toHaveLength(2);
        });

        it("sets the users choices as selected in the resulting flow", () => {
            expect(answerFlow.levels[0].choices[0].selected).toBeTruthy();
            expect(answerFlow.levels[0].choices[1].selected).toBeFalsy();
            expect(answerFlow.levels[1].choices[0].selected).toBeFalsy();
        });
    });
});
