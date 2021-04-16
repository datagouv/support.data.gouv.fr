import * as fs from "fs";
import * as path from "path";
import YAML from "yaml";
import { v4 as uuidv4 } from "uuid";
import marked from "marked";
import {
    Answer,
    Choice,
    ChoiceId,
    Question,
    QuestionTitle,
} from "../../domain/support/question-tree";
import { checkRawQuestionTreeType } from "./raw-question-tree.guard";

export type RawChoice = {
    label: string;
    link: { content: string } | { path: string } | RawQuestionTree;
};

export type RawQuestionTree = {
    title: string;
    choices: RawChoice[];
};

export const buildQuestionTree = (basePath = "config"): Question => {
    const yamlFileContent = fs.readFileSync(
        path.resolve(basePath, "question-tree.yaml"),
        "utf8"
    );

    const rawQuestionTree = YAML.parse(yamlFileContent) as unknown;

    if (!checkRawQuestionTreeType(rawQuestionTree)) {
        throw new Error("Invalid question tree format");
    }

    return refineRawQuestion(rawQuestionTree, basePath);
};

const refineRawQuestion = (
    rawQuestion: RawQuestionTree,
    basePath: string
): Question => {
    return {
        title: rawQuestion.title as QuestionTitle,
        choices: rawQuestion.choices.map(
            (choice: RawChoice): Choice => {
                return {
                    id: uuidv4() as ChoiceId,
                    label: choice.label,
                    link: refineRawLink(choice.link, basePath),
                };
            }
        ),
    };
};

const refineRawLink = (
    rawLink: { content: string } | { path: string } | RawQuestionTree,
    basePath: string
): Answer | Question => {
    if ("content" in rawLink) {
        return rawLink;
    }
    if ("path" in rawLink) {
        return {
            content: transformMarkdown(
                fs.readFileSync(basePath + "/" + rawLink.path, "utf-8")
            ),
        };
    }
    return refineRawQuestion(rawLink, basePath);
};

const transformMarkdown = (markdownContent: string): string => {
    const htmlContent = marked(markdownContent);
    return htmlContent.replace(
        /<button href="(.+)">(.+)?<\/button>/g,
        (_, href: string, text: string) => {
            return `<div class="w-full flex justify-center"><a class="bg-blue-400 px-4 py-2 m-0.5 shadow-none rounded-md" href="${href}">${text}</a></div>`;
        }
    );
};
