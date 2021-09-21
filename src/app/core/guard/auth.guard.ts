import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    // private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const user = this.authenticationService.userValue;
  //   if (user) {
  //     // check if route is restricted by role
  //     if (route.data.roles && route.data.roles.indexOf(user.role) === -1) {
  //       // role not authorised so redirect to home page
  //       this.router.navigate(['/']);
  //       return false;
  //     }
  //
  //     // authorised so return true
      return true;
    }
  //
  //   // not logged in so redirect to auth page with the return url
  //   this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
}
