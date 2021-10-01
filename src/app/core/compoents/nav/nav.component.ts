import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/classes/category';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLogin: boolean = !!localStorage.getItem('user');
  notifier = new Subject();
  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .isAuthenticated()
      .pipe(takeUntil(this.notifier))
      .subscribe((isAuthenticated) => (this.isLogin = isAuthenticated));
    this.getCategories();
  }

  logout() {
    this.isLogin = false;
    this.authService.logout();
    this.router.navigate(['sign-in']);
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .pipe(takeUntil(this.notifier))
      .subscribe((category) => (this.categories = category));
  }
  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
