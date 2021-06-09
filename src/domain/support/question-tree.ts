import {Brand} from './branded-types';

export type Answer =
  | {
      content: string;
    }
  | {form: {title: string; recipient: string}};

export type ChoiceId = Brand<string, 'ChoiceId'>;

export type Choice = {
  id: ChoiceId;
  label: string;
  link: Answer | Question;
};

export type QuestionTitle = Brand<string, 'QuestionTitle'>;

export type Question = {
  title: QuestionTitle;
  choices: Choice[];
};
