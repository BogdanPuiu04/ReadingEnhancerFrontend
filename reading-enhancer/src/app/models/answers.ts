export class Answer {
  id: string;
  isCorrect: boolean;
  text: string;

  constructor(options?: Answer) {
    this.id = options?.id!;
    this.text = options?.text!;
    this.isCorrect = options?.isCorrect!;
  }
}
