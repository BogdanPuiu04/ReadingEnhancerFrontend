import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
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
  links: string[] = [];
  secondEnhancedWebpage: string='';

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
        this.errorMessage = '';
      },
      error: (e) => {
        this.errorMessage = e.error.Errors[0];
        this.btnClicked = false;
      }
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
    this.addExternalLinksToBeEnhanced();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngOnInit(): void {
    this.initForm();
  }

  enhanceAnotherWebpage(webpageToBeConverted: string) {
    this.secondEnhancedWebpage = this.webpage;
    this.enhanceWebpage(webpageToBeConverted);
  }

  async back() {
    this.webpage = this.secondEnhancedWebpage;
    this.secondEnhancedWebpage = '';
    this.closeModal('webpage-modal');
    await this.delay(1);
    this.openModal('webpage-modal');
  }

  private addExternalLinksToBeEnhanced() {
    const allElements = document.getElementsByTagName('a');
    let localLink = (window.location.href).replace('/webpage', '');

    for (let a = 0; a < allElements.length; a++) {
      allElements[a].replaceWith(allElements[a].cloneNode(true));
      if (!allElements[a].href.includes(localLink)) {
        allElements[a].addEventListener('click', (e: Event) => {
          this.enhanceAnotherWebpage(allElements[a].href);
          e.preventDefault();
        });
        allElements[a].style.cursor = "pointer";
      } else {
        allElements[a].removeAttribute("href");
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
