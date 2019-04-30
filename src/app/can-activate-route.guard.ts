import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService : AuthenticationService, private routeService : RouterService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean
  {
  /*return this.authService.isUserAuthenticated(this.authService.getBearerToken())
   // .then((response)=>{
      if(!response)
        this.routeService.routeToLogin();
      return response;
    })*/
   // return true;


    //if(!this.authService.isUserAuthenticated(this.authService.getBearerToken())) this.routeService.routeToLogin();
   // else return this.authService.isUserAuthenticated(this.authService.getBearerToken());;

      if(this.authService.getBearerToken()==null) this.routeService.routeToLogin();
      else return true;
  }

  
}
