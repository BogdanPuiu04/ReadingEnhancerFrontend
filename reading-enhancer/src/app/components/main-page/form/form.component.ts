import {Component, OnInit} from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup
} from "@angular/forms";
import {EnhancedTextService} from "../../../services/enhanced-text.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form !: FormGroup;
  text !: string;

  constructor(private formBuilder: FormBuilder,
              private textService: EnhancedTextService) {
  }


  initForm(): void {
    this.form = this.formBuilder.group({
      enhancedText: new FormControl(this.text)
    })


  }

  onSubmit() {
    this.enhanceText(this.form.value.enhancedText)
  }

  enhanceText(text: string) {
    this.textService.enhanceText(text).subscribe({
      next: (res) => {
        console.log("succes");
      },
      error : () => {
        console.log("fail");
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}


