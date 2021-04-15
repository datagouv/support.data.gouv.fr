import * as fs from "fs";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";
import {
    Choice,
    ChoiceId,
    Question,
    QuestionTitle,
} from "../../domain/support/question-tree";

type RawChoice = {
    label: string;
    link: { content: string } | RawQuestionTree;
};

export type RawQuestionTree = {
    title: string;
    choices: RawChoice[];
};

export const checkRawQuestionTreeType = (
    rawQuestionTree: unknown
): rawQuestionTree is RawQuestionTree => {
    if (typeof rawQuestionTree !== "object" || !rawQuestionTree) {
        return false;
    }
    if (!("title" in rawQuestionTree)) {
        return false;
    }
    if (!("choices" in rawQuestionTree)) {
        return false;
    }
    const candidate = rawQuestionTree as RawQuestionTree;
    if (typeof candidate.title !== "string") {
        return false;
    }
    if (!candidate.choices) {
        return false;
    }
    if (!(candidate.choices instanceof Array)) {
        return false;
    }
    return candidate.choices.reduce((acc: boolean, choice: unknown) => {
        if (typeof choice !== "object" || !choice) {
            return false;
        }
        if (!("label" in choice)) {
            return false;
        }
        if (!("link" in choice)) {
            return false;
        }
        const candidate = choice as RawChoice;
        if (!candidate.label) {
            return false;
        }
        if (!candidate.link) {
            return false;
        }
        if ("content" in candidate.link) {
            return acc && candidate.link.content !== undefined;
        }
        return acc && checkRawQuestionTreeType(candidate.link);
    }, true);
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
