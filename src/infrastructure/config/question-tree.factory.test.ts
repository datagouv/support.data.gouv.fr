import { buildQuestionTree } from "./question-tree.factory";

describe("The question tree factory", () => {
    it("builds valid question trees", () => {
        const functionToTest = () => buildQuestionTree();
        expect(functionToTest).not.toThrowError();
    });
});
