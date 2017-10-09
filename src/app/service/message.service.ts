import { Injectable } from '@angular/core';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';

@Injectable()
export class MessageService {
  constructor(private _toastyService: ToastyService) {}

  public showSuccess(title: string, text: string) {
    const toastOptions = this.getMessage(title, text);
    this._toastyService.success(toastOptions);
  }

  public showError(title: string, text: string) {
    const toastOptions = this.getMessage(title, text);
    this._toastyService.error(toastOptions);
  }

  private getMessage(title: string, text: string): ToastOptions {
    const toastOptions: ToastOptions = {
      title: title,
      msg: text,
      showClose: true,
      theme: 'bootstrap'
    };
    return toastOptions;
  }
}
