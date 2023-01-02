export class Answer {
  id: string;
  text: string;

  constructor(options?: Answer) {
    this.id = options?.id!;
    this.text = options?.text!;
  }
}
