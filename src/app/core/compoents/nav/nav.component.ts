import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/nav.service";
import {Category} from "../../../shared/classes/category";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoriesService, public authService: AuthService) {}

  ngOnInit(): void {
    this.getCategories()
  }

  logout() {
    sessionStorage.removeItem('user');
    this.authService.loggedIn = false;
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(category => this.categories = category);
    console.log(this.categories)
  }
}
