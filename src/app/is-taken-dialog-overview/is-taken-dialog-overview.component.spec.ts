import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsTakenDialogOverviewComponent } from './is-taken-dialog-overview.component';

describe('IsTakenDialogOverviewComponent', () => {
  let component: IsTakenDialogOverviewComponent;
  let fixture: ComponentFixture<IsTakenDialogOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsTakenDialogOverviewComponent]
    });
    fixture = TestBed.createComponent(IsTakenDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
