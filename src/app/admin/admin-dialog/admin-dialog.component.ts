import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../core/services/categories.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../../shared/classes/category';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent implements OnInit {
  nameFormControl = new FormControl(this.data.name, [Validators.required]);
  category!: Category;
  fileInputLabel!: any;
  fileUploadForm!: FormGroup | any;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoriesService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.category = this.data;
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
  }

  public addCategory(): void {
    this.dialogRef.afterClosed().subscribe(() => {});
    this.dialogRef.close('Successfully add to cart');
  }

  public editCategory() {
    this.data.name = this.nameFormControl.value;
    this.categoryService.editCategory(this.data).subscribe(() => {
      this.dialogRef.close('Successfully add to cart');
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  onFormSubmit() {
    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append(
      'uploadedImage',
      this.fileUploadForm.get('uploadedImage').value
    );
    formData.append('agentId', '007');

    return this.categoryService.uploadCategoryImg(formData).subscribe(
      (response: { statusCode: number }) => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input

          this.uploadFileInput.nativeElement.value = '';
          this.fileInputLabel = undefined;
        }
      },
      (er: { error: { error: any } }) => {
        console.log(er);
        alert(er.error.error);
      }
    );
  }
}
