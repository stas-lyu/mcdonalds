import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CategoriesService} from "../../core/services/categories.service";
import {MatDialog} from "@angular/material/dialog";
import {Dish} from "../../shared/classes/dish";
import {CategoryDialogComponent} from "../category-item-dialog/category-dialog.component";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {

  dishes: Dish[] = [];

  constructor(
    private dishesService: CategoriesService,
    public dialog: MatDialog, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getDishesByCategoryId(params.category)
    });
  }

  public openDishesDescriptionModal(dish: Dish):void {
    this.dialog.open(CategoryDialogComponent, {
      data: dish
    });
  }

  private getDishesByCategoryId(id: any):void {
    this.dishesService.getDishesByCategoryId(id).subscribe(dishes => this.dishes = dishes, error => console.log(error));
  }
}
