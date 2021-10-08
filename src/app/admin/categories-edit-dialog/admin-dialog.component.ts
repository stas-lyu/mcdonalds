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
import { Subscription } from 'rxjs';
import { selectedCategories } from '../../categories/store/selectors/categories.selectors';
import * as CategoriesActions from '../../categories/store/actions/categories.actions';
import { Store } from '@ngrx/store';
import { ICategoriesState } from '../../categories/store/state/categories.state';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-edit-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss'],
})
export class AdminDialogComponent implements OnInit {
  nameFormControl = new FormControl(this.data.name, [Validators.required]);
  fileUploadForm!: FormGroup;
  storeSub!: Subscription;
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput!: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AdminDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Category,
    public categoryService: CategoriesService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private store: Store<ICategoriesState>
  ) {}

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });
  }

  public editCategory() {
    this.data = { ...this.data, name: this.nameFormControl.value };
    this.store.dispatch(new CategoriesActions.UpdateCategory(this.data));
    this.storeSub = this.store
      .select(selectedCategories)
      .subscribe(() => this.dialogRef.close('Successfully edit category'));
  }
}
