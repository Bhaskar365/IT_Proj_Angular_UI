import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiServiceService } from '../services/api.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api:ApiServiceService, private router:Router){}

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): 
                Observable<boolean | UrlTree> | 
                Promise<boolean | UrlTree>    |
                boolean | 
                UrlTree 
  {
             var x =  this.api.isLoggedIn();
             if(x) {
              return true;
             }
             return this.router.parseUrl('/login');
  }
}

