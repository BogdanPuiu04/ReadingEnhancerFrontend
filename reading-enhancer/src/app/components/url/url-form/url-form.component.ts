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

  constructor(private formBuilder: FormBuilder,
              private textService: EnhancedTextService,
              private modalService: ModalService) {
  }

  initForm(): void {
    this.urlForm = this.formBuilder.group({
      enhancedWebpage: new FormControl(this.webpage)
    })
  }

  onSubmit() {
    this.enhanceWebpage(this.urlForm.value.enhancedWebpage);
  }

  enhanceWebpage(webpageToBeConverted: string) {
    this.textService.enhanceText(webpageToBeConverted).subscribe({
      next: (res) => {
        this.webpage = res;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string){
    this.modalService.close(id);
  }
  ngOnInit(): void {
    this.initForm();
  }

}
