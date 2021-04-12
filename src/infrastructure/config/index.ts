import * as dotenv from "dotenv";
import {
    Answer,
    ChoiceId,
    Question,
    QuestionTitle,
} from "../../domain/support/question-tree";

dotenv.config();

export const port = process.env.PORT;

const answerLevel1: Answer = {
    content: "Content level 1",
};
const answerLevel2: Answer = {
    content: "Content level 2",
};
export const questionTree: Question = {
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
