import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { CustomHttpService } from './service/custom-http.service';

export function HttpFactory(
  backend: XHRBackend,
  options: RequestOptions
): Http {
  return new CustomHttpService(backend, options);
}
