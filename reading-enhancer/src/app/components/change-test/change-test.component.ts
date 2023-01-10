import {Component, OnInit, Output} from '@angular/core';
import {ReadingText} from "../../models/readingText";
import {ReadingTestService} from "../../services/reading-test.service";

@Component({
  selector: 'app-change-test',
  templateUrl: './change-test.component.html',
  styleUrls: ['./change-test.component.scss']
})
export class ChangeTestComponent implements OnInit {

  @Output() texts: ReadingText[] = [];
  panelOpenState = false;
  constructor(private readingService: ReadingTestService) {
  }

  ngOnInit(): void {
    this.getAllTexts();
  }

  getAllTexts(): void {
    this.readingService.getAllText().subscribe((data) => {
      data.texts.forEach(text => this.texts.push(text));
    });
    console.log(this.texts);
  }

  getFirstTenWords(text: string): string{
    return text.split(' ').slice(0,10).join(' ');
  }

  editText(textId : string): void{

  }
}
