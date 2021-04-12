import { Question } from "../../domain/support/question-tree";
import { questionTree } from ".";

const checkType = (questionTree: any): questionTree is Question => {
    if (!questionTree.title) {
        return false;
    }
    if (!questionTree.choices) {
        return false;
    }
    if (!(questionTree.choices instanceof Array)) {
        return false;
    }
    return questionTree.choices.reduce((acc: boolean, choice: any) => {
        if (!choice.id) {
            return false;
        }
        if (!choice.label) {
            return false;
        }
        if (!choice.link) {
            return false;
        }
        return acc && (choice.link.content || checkType(choice.link));
    }, true);
};

describe("The question tree", () => {
    it("must be valid", () => {
        expect(checkType(questionTree)).toBeTruthy();
    });
});
