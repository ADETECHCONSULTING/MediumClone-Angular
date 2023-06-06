import { Component, Input, OnInit } from '@angular/core';
import { BackEndErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {

  @Input() backendErrors: BackEndErrorsInterface
  errorMessages: string[]

  constructor() { }

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name) => {
      const messages = this.backendErrors[name].join(' ')
      return name + ' ' + messages
    })
  }

}
