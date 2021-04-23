import "@hotwired/turbo";
import { Application } from "stimulus";
import "./index.css";
import FormController from "./form.controller";

const application = Application.start();
application.register("form", FormController);
