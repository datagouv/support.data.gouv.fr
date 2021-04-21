import { RawChoice, RawQuestionTree } from "./question-tree.factory";

export const checkRawQuestionTreeType = (
    rawQuestionTree: unknown
): rawQuestionTree is RawQuestionTree => {
    if (typeof rawQuestionTree !== "object" || !rawQuestionTree) {
        return false;
    }
    if (!("title" in rawQuestionTree)) {
        return false;
    }
    if (!("choices" in rawQuestionTree)) {
        return false;
    }
    const candidate = rawQuestionTree as RawQuestionTree;
    if (typeof candidate.title !== "string") {
        return false;
    }
    if (!candidate.choices) {
        return false;
    }
    if (!(candidate.choices instanceof Array)) {
        return false;
    }
    return candidate.choices.reduce((acc: boolean, choice: unknown) => {
        if (typeof choice !== "object" || !choice) {
            return false;
        }
        if (!("label" in choice)) {
            return false;
        }
        if (!("link" in choice)) {
            return false;
        }
        const candidate = choice as RawChoice;
        if (!candidate.label) {
            return false;
        }
        if (!candidate.link) {
            return false;
        }
        if ("content" in candidate.link) {
            return acc && candidate.link.content !== undefined;
        }
        if ("path" in candidate.link) {
            return acc && candidate.link.path !== undefined;
        }
        if ("form" in candidate.link && "title" in candidate.link.form) {
            return acc && candidate.link.form.title !== undefined;
        }
        return acc && checkRawQuestionTreeType(candidate.link);
    }, true);
};
