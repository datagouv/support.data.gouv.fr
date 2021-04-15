import * as fs from "fs";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";
import {
    Choice,
    ChoiceId,
    Question,
    QuestionTitle,
} from "../../domain/support/question-tree";
import { checkRawQuestionTreeType } from "./raw-question-tree.guard";

export type RawChoice = {
    label: string;
    link: { content: string } | RawQuestionTree;
};

export type RawQuestionTree = {
    title: string;
    choices: RawChoice[];
};

export const buildQuestionTree = (): Question => {
    const yamlFileContent = fs.readFileSync(
        "config/question-tree.yaml",
        "utf8"
    );

    const rawQuestionTree = YAML.parse(yamlFileContent) as unknown;

    if (!checkRawQuestionTreeType(rawQuestionTree)) {
        throw new Error("Invalid question tree format");
    }

    return refineRawQuestion(rawQuestionTree);
};

const refineRawQuestion = (rawQuestion: RawQuestionTree): Question => {
    return {
        title: rawQuestion.title as QuestionTitle,
        choices: rawQuestion.choices.map(
            (choice: RawChoice): Choice => {
                const link =
                    "content" in choice.link
                        ? choice.link
                        : refineRawQuestion(choice.link);
                return {
                    id: uuidv4() as ChoiceId,
                    label: choice.label,
                    link,
                };
            }
        ),
    };
};
