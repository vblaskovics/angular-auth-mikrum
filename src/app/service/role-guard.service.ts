import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth:AuthService, public router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const expectedRole = route.data.expectedRole;
    const currentUserValue:any = this.auth.currentUserValue;

    if(
      !currentUserValue || 
      currentUserValue.role < expectedRole
    ) {
      this.router.navigate(['forbidden']);
      return false;
    }

    return true;
  }
}
