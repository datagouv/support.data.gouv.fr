import {
    buildQuestionTree,
    checkQuestionTreeType,
} from "./question-tree.factory";

describe("The question tree factory", () => {
    const questionTree = buildQuestionTree();
    it("builds valid question trees", () => {
        expect(checkQuestionTreeType(questionTree)).toBeTruthy();
    });
});
