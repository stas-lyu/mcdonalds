import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../../shared/classes/category';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLogin!: boolean;

  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.authService.isAuthenticated().subscribe((res) => (this.isLogin = res));
  }

  logout() {
    this.isLogin = false;
    this.authService.logout();
    this.router.navigate(['sign-in']);
  }

  getCategories(): void {
    this.categoryService
      .getCategories()
      .subscribe((category) => (this.categories = category));
  }
}
