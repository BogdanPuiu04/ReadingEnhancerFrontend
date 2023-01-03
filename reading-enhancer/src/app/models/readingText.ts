import {Question} from "./question";

export class ReadingText {
  id: string;
  text: string;
  questionsList: Question[];

  constructor(options?: ReadingText) {
    this.id = options?.id!;
    this.text = options?.text!;
    this.questionsList = options?.questionsList!;
  }
}
