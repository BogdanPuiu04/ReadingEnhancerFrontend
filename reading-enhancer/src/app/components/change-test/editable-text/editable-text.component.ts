import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss'],
  outputs: ["valueChangeEvents: valueChange"],
  inputs: ["value"]
})
export class EditableTextComponent {
  public isEditing: boolean;
  public pendingValue: string;
  public value!: string;
  public valueChangeEvents: EventEmitter<string>;

  constructor() {

    this.isEditing = false;
    this.pendingValue = "";
    this.valueChangeEvents = new EventEmitter();
  }

  public cancel(): void {

    this.isEditing = false;

  }


  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }


  public processChanges(): void {

    if (this.pendingValue !== this.value && this.pendingValue !== '') {

      this.valueChangeEvents.emit(this.pendingValue);

    }

    this.isEditing = false;

  }

}
