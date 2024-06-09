import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogOverviewComponent } from './delete-dialog-overview.component';

describe('DeleteDialogOverviewComponent', () => {
  let component: DeleteDialogOverviewComponent;
  let fixture: ComponentFixture<DeleteDialogOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogOverviewComponent]
    });
    fixture = TestBed.createComponent(DeleteDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
