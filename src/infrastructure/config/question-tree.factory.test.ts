import { Answer, Question } from "../../domain/support/question-tree";
import { buildQuestionTree } from "./question-tree.factory";

describe("The question tree factory", () => {
    const functionToTest = () => buildQuestionTree(__dirname + "/__tests__");

    it("builds valid question trees", () => {
        expect(functionToTest).not.toThrowError();
    });

    it("reads and parses content from config file", () => {
        const questionTree = functionToTest();
        const transformedAnswer = (((questionTree.choices[0].link as Question)
            .choices[0].link as Question).choices[0].link as Answer).content;
        expect(transformedAnswer).toContain(
            "<p>Réponse pour <strong>demandes valeurs foncières</strong>.</p>\n<p>Les valeurs foncières yéyé.</p>\n"
        );
        expect(transformedAnswer).toContain(
            '<div class="w-full flex justify-center"><a class="bg-blue-400 px-4 py-2 m-0.5 shadow-none rounded-md" href="https://www.wikipedia.com">Wikipedia</a></div>'
        );
    });
});

describe("The configured question tree", () => {
    it("is valid", () => {
        expect(buildQuestionTree).not.toThrowError();
    });
});
