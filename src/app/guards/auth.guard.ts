import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../services/api.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api:ApiServiceService){}

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): 
                Observable<boolean | UrlTree> | 
                Promise<boolean | UrlTree>    |
                boolean | 
                UrlTree 
  {
             return this.api.isLoggedIn();
  }
}
