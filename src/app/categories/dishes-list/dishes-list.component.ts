import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {CategoriesService} from "../../core/services/categories.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatDialog} from "@angular/material/dialog";
import {Dish} from "../../shared/classes/dish";
import {CategoryDialogComponent} from "../category-item-dialog/category-dialog.component";

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})

export class DishesListComponent implements OnInit {
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  };
  cols: number | undefined;
  dishes: Dish[] = [];

  constructor(private dishesService: CategoriesService, private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private route: ActivatedRoute) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
        }
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.getDishesByCategoryId(params.category)
    });
  }

  openDishesDescriptionModal(dishes: Dish) {
    this.dialog.open(CategoryDialogComponent, {
      data: dishes
    });
  }

  private getDishesByCategoryId(id: any) {
    // @ts-ignore
    this.dishesService.getDishesByCategoryId(id).subscribe(dishes => this.dishes = dishes);
  }

}
