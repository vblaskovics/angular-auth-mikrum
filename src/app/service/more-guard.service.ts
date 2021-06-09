import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class MoreGuardService implements CanActivate {
  routesState: { [k: string]: boolean };

  constructor(private config: ConfigService) {
    this.routesState = {'': false};
    this.config.routesToGoBeforeMore.map(route => {
      this.routesState[route] = false;
    });
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const path: string = route.routeConfig?.path || '';
    if(this.routesState[path] === false){
      this.routesState[path] = true;
    }
    
    const isMoreReady = Object.values(this.routesState).every(s => s);
    console.log(isMoreReady ? 'More is ready' : 'More is not ready', this.routesState);
    if(path === 'more' && !isMoreReady) {
      return false;
    }

    return true;
  }
}
