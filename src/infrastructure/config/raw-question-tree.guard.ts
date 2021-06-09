import { RawQuestionTree } from "./question-tree.factory";
import { z } from "zod";

const rawQuestionTreeSchema: z.Schema<RawQuestionTree> = z.object({
  title: z.string(),
  choices: z.array(
    z.object({
      label: z.string(),
      link: z.union([
        z.object({ content: z.string() }),
        z.object({ path: z.string() }),
        z.object({
          form: z.object({ title: z.string(), recipient: z.string() }),
        }),
        z.lazy(() => rawQuestionTreeSchema),
      ]),
    })
  ),
});

export const checkRawQuestionTreeType = (
  rawQuestionTree: unknown
): rawQuestionTree is RawQuestionTree => {
  return rawQuestionTreeSchema.safeParse(rawQuestionTree).success;
};
