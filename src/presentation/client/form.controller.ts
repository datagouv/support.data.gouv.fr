import { Controller } from "@stimulus/core";
import * as Turbo from "@hotwired/turbo";
import { Locatable } from "@hotwired/turbo/dist/types/core/url";
import { FormSubmissionResult } from "@hotwired/turbo/dist/types/core/drive/form_submission";

export default class extends Controller {
    static values = { next: String };
    nextValue!: Locatable;

    next(event: { detail: FormSubmissionResult }): void {
        if (event.detail.success) {
            Turbo.visit(this.nextValue, { action: "advance" });
        }
    }
}
