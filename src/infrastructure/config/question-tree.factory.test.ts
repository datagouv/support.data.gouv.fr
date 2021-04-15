import { buildQuestionTree } from "./question-tree.factory";

describe("The question tree factory", () => {
    it("builds valid question trees", () => {
        expect(buildQuestionTree).not.toThrowError();
    });
});
