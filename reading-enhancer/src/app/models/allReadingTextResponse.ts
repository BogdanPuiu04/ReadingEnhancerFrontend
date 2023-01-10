import {ReadingText} from "./readingText";

export class AllReadingTextsResponse {
      texts : ReadingText[];
  constructor(options: AllReadingTextsResponse) {
    this.texts= options.texts;
  }
}
