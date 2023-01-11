import {ReadingText} from "./readingText";

export class ReadingTextResponseModel{
  text: ReadingText;
  wordCount: number;

  constructor(options?: ReadingTextResponseModel) {
    this.text=options?.text!;
    this.wordCount=options?.wordCount!;
  }
}
