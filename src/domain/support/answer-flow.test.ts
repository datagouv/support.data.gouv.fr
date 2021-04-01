import { AnswerFlow, UserChoices } from "./answer-flow";
import { ChoiceId, Question, QuestionTitle } from "./question-tree";

describe("Answer flow", () => {
    describe("For a valid question tree", () => {
        const questionTree: Question = {
            title: "First question" as QuestionTitle,
            choices: [
                {
                    id: "choice1" as ChoiceId,
                    label: "Choice 1",
                    link: {
                        content: "Content 1",
                    },
                },
            ],
        };
        const userChoices: UserChoices = [];

        const answerFlow = AnswerFlow.fromQuestionTreeAndUserChoices(
            questionTree,
            userChoices
        );

        it("has one more level than user choices count", () => {
            expect(answerFlow.levels).toHaveLength(1);
        });
    });
});
