import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './page/nav/nav.component';
import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { LoginComponent } from './page/login/login.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
