import * as dotenv from "dotenv";
import fs from "fs";
import YAML from "yaml";
import { Question } from "../../domain/support/question-tree";

dotenv.config();

export const port = process.env.PORT;

const yamlFileContent = fs.readFileSync("question-tree.yaml", "utf8");

export const questionTree = YAML.parse(yamlFileContent) as Question;
