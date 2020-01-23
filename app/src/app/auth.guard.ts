import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from './models/generated';
import { take, tap, map } from '../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService: DataService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      // return this.dataService.user.getAuthorizedUser().pipe(
      //   take(1),
      //   tap(u => {
      //     if(!u) {
      //       console.log('not logged in!');
      //     } else {
      //     }
      //   }),
      //   // map to true so you can still nav even though your not logged in.
      //   map(u => true),
      // );
      return of(true);
  }
}
