import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          // Se l'utente non è autenticato, continua la richiesta senza aggiungere il token di autenticazione
          return next.handle(req);
        }
        
        // Clona la richiesta originale e aggiungi il token di autenticazione all'header Authorization
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            'Authorization': `Bearer ${user.token}`
          })
        });

        // Invia la richiesta modificata al gestore successivo
        return next.handle(modifiedReq);
      }),
      catchError((error) => {
        // Gestisci eventuali errori durante l'intercettazione della richiesta
        console.error('Error in intercepting request:', error);
        throw error; // Rilancia l'errore per consentire la gestione altrove
      })
    );
  }
}
