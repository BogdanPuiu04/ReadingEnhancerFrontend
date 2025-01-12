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
  errorMessage!: string;

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

  enhanceText(textToBeConverted: string) {
    this.textService.enhanceText(textToBeConverted).subscribe({
      next: (res) => {
        this.text = res;
      },
      error: (e) => {
        this.errorMessage = e.error.Errors[0];
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }
}


