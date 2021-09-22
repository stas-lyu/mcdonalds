import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  dataInfo :{} = {}

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {this.dataInfo = data}

  ngOnInit(): void {
    console.log(this.dataInfo)
  }

}
