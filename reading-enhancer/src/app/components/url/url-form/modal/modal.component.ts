import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ModalService} from "../../../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string = '';
  @Input() webpageEnhancedText: string = '';
  private element: any;
  isModalOpen = false;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error();
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'my-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  open(): void {
    this.isModalOpen = true;
    this.element.style.display = 'block';
    document.body.classList.add('my-modal-open')
  }

  close(): void {
    this.isModalOpen = false;
    this.element.style.display = 'none';
    document.body.classList.remove('my-modal-open');
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

}
