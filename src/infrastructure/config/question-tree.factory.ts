import * as fs from "fs";
import YAML from "yaml";
import { Question } from "../../domain/support/question-tree";

export const buildQuestionTree = (): Question => {
    const yamlFileContent = fs.readFileSync(
        "config/question-tree.yaml",
        "utf8"
    );

    return YAML.parse(yamlFileContent) as Question;
};
