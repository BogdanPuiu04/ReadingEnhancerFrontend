import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {EnhancedTextService} from "../../../services/enhanced-text.service";
import {ModalService} from "../../../services/modal.service";

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.scss']
})
export class UrlFormComponent implements OnInit {
  urlForm !: FormGroup;
  webpage !: string;
  errorMessage !: string;
  btnClicked!: boolean;

  constructor(private formBuilder: FormBuilder,
              private textService: EnhancedTextService,
              private modalService: ModalService) {
  }

  initForm(): void {
    this.urlForm = this.formBuilder.group({
      enhancedWebpage: new FormControl(this.webpage)
    })
    this.btnClicked = false;
  }

  onSubmit() {
    this.enhanceWebpage(this.urlForm.value.enhancedWebpage);
    this.btnClicked = true;
  }

  enhanceWebpage(webpageToBeConverted: string) {
    this.textService.enhanceWebsite(webpageToBeConverted).subscribe({
      next: (res) => {
        this.webpage = res;
      },
      error: (e) => {
        this.errorMessage = e.error.Errors[0];
      }
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit(): void {
    this.initForm();
  }

}
