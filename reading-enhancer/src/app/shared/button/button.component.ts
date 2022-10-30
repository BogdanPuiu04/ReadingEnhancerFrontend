import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonText = 'button';
  @Input() iconPosition = '';
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Input() buttonSize: 'large' | 'medium' | 'small' |'square' = 'large';
  @Input() iconLink = '';
  @Input() public disabledValue = false;
  @Output() clickBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }


  ngOnInit(): void {
  }

  buttonClicked(): void {
    this.clickBtn.emit(true);
  }
}
