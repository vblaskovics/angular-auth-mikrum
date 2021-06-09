import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from './service/analytics.service';
import { AnalyticsImplementation, Metric } from './service/analytics.interface';
import { LoggingInterceptorService } from './service/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    UsersComponent,
    ForbiddenComponent,
    UserEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true},
    {provide: AnalyticsService,
      useFactory() {
      const loggingImplementation: AnalyticsImplementation = {
        recordEvent: (metric: Metric):void => {
          console.log('The metric is:', metric);
        }
      }

      return new AnalyticsService(loggingImplementation);
    }}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
