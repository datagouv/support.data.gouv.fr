import {Question} from '../../domain/support/question-tree';
import {SupportFlow, UserChoices} from '../../domain/support/support-flow';

export const navigateSupportFlowUseCase = (
  questionTree: Question,
  userChoices: UserChoices
): SupportFlow => {
  return new SupportFlow(questionTree, userChoices);
};
