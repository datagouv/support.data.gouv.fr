import * as dotenv from "dotenv";
import { Question } from "../../domain/support/question-tree";
import * as tree from "./question-tree.json";

dotenv.config();

export const port = process.env.PORT;

export const questionTree = tree as Question;
