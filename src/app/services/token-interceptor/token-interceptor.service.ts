import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SistemaService } from '../sistema/sistema.service';

/**
 * Service class in charge or intercept http request from the service and add to the
 * request the authorization header with the jsonwebtoken if the user is logged in.
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private sistema: SistemaService) {}

  /**
   * Method that intercepts the http request and add the token in the
   * authorization header.
   */
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
