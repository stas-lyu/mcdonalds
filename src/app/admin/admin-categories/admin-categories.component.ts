import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Category} from "../../shared/classes/category";
import {CategoriesService} from "../../core/services/categories.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];

  @ViewChild('UploadFileInput') uploadFileInput!: ElementRef;
  myfilename:string = 'Select File';

  constructor(public categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  fileFormControl = new FormControl('', [Validators.required]);
  nameFormControl = new FormControl('', [Validators.required]);

  private getCategories() {
    this.categoryService.getCategories().subscribe(category => this.categories = category);
  }
  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: any) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }

  public addCategory() {
    const categoryData = {
      id: 10,
      name: this.nameFormControl.value,
      imgUrl: this.fileFormControl.value,
    }
    console.log(categoryData)
    this.categoryService.addCategory(categoryData)
    setTimeout(()=> {

    this.getCategories();

    console.log(this.categories)
    },1000)
  }

  public editCategory(categoryId: number) {
    const categoryData = {
      name: this.nameFormControl.value,
      imgUrl: this.fileFormControl.value,
    }
    this.categoryService.editCategory(categoryData, categoryId)
  }

  public deleteCategory(categoryId:number):void {
  this.categoryService.deleteCategory(categoryId)
    this.getCategories();
  }
}
