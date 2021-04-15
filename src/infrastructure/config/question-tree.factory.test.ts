import { Answer, Question } from "../../domain/support/question-tree";
import { buildQuestionTree } from "./question-tree.factory";

describe("The question tree factory", () => {
    const functionToTest = () => buildQuestionTree(__dirname + "/__tests__");

    it("builds valid question trees", () => {
        expect(functionToTest).not.toThrowError();
    });

    it("reads content from config file", () => {
        const questionTree = functionToTest();
        expect(
            (((questionTree.choices[0].link as Question).choices[0]
                .link as Question).choices[0].link as Answer).content
        ).toEqual("answers/demandes-valeurs-foncieres.md");
    });
});
