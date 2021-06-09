import {Question} from '../../domain/support/question-tree';
import {buildQuestionTree} from './question-tree.factory';

describe('The question tree factory', () => {
  const functionToTest = () => buildQuestionTree(__dirname + '/__tests__');

  it('builds valid question trees', () => {
    expect(functionToTest).not.toThrowError();
  });

  it('reads and parses content from config file', () => {
    const questionTree = functionToTest();
    const transformedAnswer = (
      (questionTree.choices[0].link as Question).choices[0].link as Question
    ).choices[0].link as {
      content: string;
    };
    expect(transformedAnswer).toHaveProperty('content');
    expect(transformedAnswer.content).toContain(
      '<p>Réponse pour <strong>demandes valeurs foncières</strong>.</p>\n<p>Les valeurs foncières yéyé.</p>\n'
    );
    expect(transformedAnswer.content).toContain(
      '<div class="w-full flex justify-center">\n    <a class="bg-blue-800 px-6 py-2 m-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-shadow transition-translate rounded text-white text-lg" href="https://www.wikipedia.com">Wikipedia</a>\n</div>'
    );
  });
});

describe('The configured question tree', () => {
  it('is valid', () => {
    expect(buildQuestionTree).not.toThrowError();
  });
});
