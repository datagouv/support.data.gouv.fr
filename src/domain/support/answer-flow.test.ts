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
            expect(answerFlow.levels).toHaveLength(1);
        });

        it("sets the users choices as selected in the resulting flow", () => {
            expect(answerFlow.levels[0].choices[0].selected).toBeTruthy();
        });
    });
});
