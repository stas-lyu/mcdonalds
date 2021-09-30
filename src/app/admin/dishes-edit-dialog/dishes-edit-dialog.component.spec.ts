import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesEditDialogComponent } from './dishes-edit-dialog.component';

describe('DishesEditDialogComponent', () => {
  let component: DishesEditDialogComponent;
  let fixture: ComponentFixture<DishesEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishesEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishesEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
