import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(private _dataService: DataService, private _router: Router) {}

  /**
   * 
   * @param route Only allow users to access website pages beyond
   *              the setup if they have entered their OS version
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
      if (this._dataService.getOS()) return true;
      else return this._router.parseUrl('/setup');
  }
  
}
