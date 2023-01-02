import {Answer} from "./answers";

export class Question {
  id: string;
  text: string;
  answers: Answer[];

  constructor(options?: Question) {
    this.id = options?.id!;
    this.text = options?.text!;
    this.answers = options?.answers!;
  }
}
