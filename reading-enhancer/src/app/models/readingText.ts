import {Question} from "./question";

export class ReadingText {
  id: string;
  text: string;
  questions: Question[];

  constructor(options?: ReadingText) {
    this.id = options?.id!;
    this.text = options?.text!;
    this.questions = options?.questions!;
  }
}
