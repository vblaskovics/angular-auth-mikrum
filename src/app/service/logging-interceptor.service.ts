import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsService } from './analytics.service';

@Injectable({
  providedIn: 'root'
})
export class LoggingInterceptorService {

  constructor(private analytics:AnalyticsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.analytics.record({
      eventName: 'httpRequest',
      scope: 'LoggingInterceptorService',
      details: request.url
    });
    return next.handle(request);
  }
}
