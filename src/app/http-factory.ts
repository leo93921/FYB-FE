import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CustomHttpService } from './service/custom-http.service';
import { MessageService } from './service/message.service';

export function HttpFactory(
  backend: XHRBackend,
  options: RequestOptions,
  messageService: MessageService,
  router: Router
): Http {
  return new CustomHttpService(backend, options, messageService, router);
}
