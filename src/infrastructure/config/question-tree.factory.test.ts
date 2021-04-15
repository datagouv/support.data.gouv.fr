import { buildQuestionTree } from "./question-tree.factory";

describe("The question tree factory", () => {
    it("builds valid question trees", () => {
        const functionToTest = () =>
            buildQuestionTree(__dirname + "/__tests__");
        expect(functionToTest).not.toThrowError();
    });
});
