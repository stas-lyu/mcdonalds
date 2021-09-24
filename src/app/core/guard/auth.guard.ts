import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  UrlSegment,
  Route
} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {Observable} from "rxjs";

// import { AuthenticationService } from '@app/_services';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAdmin) {
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
    // let url: string = state.url;
    // console.log(this.authService.isLoggedIn)
    // return this.checkUserLogin(next, url);
  }

//   canActivateChild(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this.canActivate(next, state);
//   }
//
//   canDeactivate(
//     component: unknown,
//     currentRoute: ActivatedRouteSnapshot,
//     currentState: RouterStateSnapshot,
//     nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }
//
//   canLoad(
//     route: Route,
//     segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
//     return true;
//   }
//
//   checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
//     if (this.authService.isLoggedIn) {
//       const userRole = this.authService.getRole;
//       return !(route.data.role && route.data.role.indexOf(userRole) === -1);
//
//     }
//
//     // this.router.navigate(['/categories']);
//     return false;
//   }
// }
