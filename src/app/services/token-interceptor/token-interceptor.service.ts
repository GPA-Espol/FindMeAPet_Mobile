import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SistemaService } from '../sistema/sistema.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private sistema: SistemaService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.sistema.userLoggedIn()).pipe(
      switchMap((user) => {
        let tokenizedReq = req;
        if (user) {
          const { token } = user;
          tokenizedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        return next.handle(tokenizedReq);
      })
    );
  }
}
