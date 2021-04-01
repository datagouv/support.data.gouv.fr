import { AnswerFlow, UserChoices } from "./answer-flow";
import { Answer, ChoiceId, Question, QuestionTitle } from "./question-tree";

describe("Answer flow", () => {
    describe("For a valid question tree", () => {
        const answerLevel1: Answer = {
            content: "Content level 1",
        };
        const answerLevel2: Answer = {
            content: "Content level 2",
        };
        const questionTree: Question = {
            title: "First question" as QuestionTitle,
            choices: [
                {
                    id: "choice1_1" as ChoiceId,
                    label: "Choice 1 1",
                    link: {
                        title: "Second question" as QuestionTitle,
                        choices: [
                            {
                                id: "choice2_1" as ChoiceId,
                                label: "Choice 2 1",
                                link: answerLevel2,
                            },
                        ],
                    },
                },
                {
                    id: "choice1_2" as ChoiceId,
                    label: "Choice 1 2",
                    link: answerLevel1,
                },
            ],
        };

        it("has one more level than user choices count", () => {
            const userChoices: UserChoices = ["choice1_1" as ChoiceId];
            const answerFlow = new AnswerFlow(questionTree, userChoices);
            expect(answerFlow.levels).toHaveLength(2);
            expect(answerFlow.finalAnswer).toBeUndefined();
        });

        it("sets the users choices as selected in the resulting flow", () => {
            const userChoices: UserChoices = ["choice1_1" as ChoiceId];
            const answerFlow = new AnswerFlow(questionTree, userChoices);
            expect(answerFlow.levels).toHaveLength(2);
            expect(answerFlow.levels[0].choices[0].selected).toBeTruthy();
            expect(answerFlow.levels[0].choices[1].selected).toBeFalsy();
            expect(answerFlow.levels[1].choices[0].selected).toBeFalsy();
        });

        it("handles a content user choice at a single level", () => {
            const userChoices: UserChoices = ["choice1_2" as ChoiceId];
            const answerFlow = new AnswerFlow(questionTree, userChoices);
            expect(answerFlow.levels).toHaveLength(1);
            expect(answerFlow.levels[0].choices[0].selected).toBeFalsy();
            expect(answerFlow.levels[0].choices[1].selected).toBeTruthy();
            expect(answerFlow.finalAnswer).toEqual(answerLevel1);
        });

        it("handles a content user choice at multi level", () => {
            const userChoices: UserChoices = [
                "choice1_1" as ChoiceId,
                "choice2_1" as ChoiceId,
            ];
            const answerFlow = new AnswerFlow(questionTree, userChoices);
            expect(answerFlow.levels).toHaveLength(2);
            expect(answerFlow.levels[0].choices[0].selected).toBeTruthy();
            expect(answerFlow.levels[0].choices[1].selected).toBeFalsy();
            expect(answerFlow.levels[1].choices[0].selected).toBeTruthy();
            expect(answerFlow.finalAnswer).toEqual(answerLevel2);
        });
    });
});
