import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Category } from '../shared/classes/category';
import { AdminDialogComponent } from './admin-dialog/admin-dialog.component';
import { CategoriesService } from '../core/services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Dish } from '../shared/classes/dish';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  categories!: Category[];
  dishes!: Dish[];
  toggleAddCategoryClass: boolean = false;
  categoryId: number = 0;

  constructor(
    private categoryService: CategoriesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  fileFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);

  private getCategories() {
    this.categoryService.getCategories().subscribe((category) => {
      console.log(category);
      this.categories = category;
    });
  }

  public addCategory() {
    const categoryData = {
      id: 10,
      name: this.nameFormControl.value,
      imgUrl: this.fileFormControl.value,
    };
    this.categoryService.addCategory(categoryData);
    setTimeout(() => {
      this.getCategories();
    }, 1000);
  }

  public deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.categoryService
        .getCategories()
        .subscribe((category) => (this.categories = category));
    });
  }

  public openEditCategoryModal(category: Category): void {
    this.dialog.open(AdminDialogComponent, {
      data: category,
    });
  }

  public deleteDish(dishId: number): void {
    this.categoryService.deleteDish(this.categoryId, dishId).subscribe(() => {
      this.categoryService
        .getCategories()
        .subscribe((category) => (this.categories = category));
    });
  }

  public openEditDishModal() {}

  selectOnChange(category: string) {
    this.categoryId = this.categories.findIndex((item: Category) => {
      return item.name === category;
    });
    this.categoryService
      .getDishesByCategoryId(this.categoryId)
      .subscribe((dishes) => (this.dishes = dishes));
  }
}
