import * as dotenv from 'dotenv';
import {buildQuestionTree} from './question-tree.factory';

dotenv.config();

export const port = process.env.PORT;

export const questionTree = buildQuestionTree();
