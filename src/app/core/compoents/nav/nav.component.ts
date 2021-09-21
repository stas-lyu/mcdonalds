import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/nav.service";
import {Category} from "../../../shared/classes/category";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(category => this.categories = category);
    console.log(this.categories)
  }
}
