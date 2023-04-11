import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidDialogComponent } from './pid-dialog.component';

describe('PidDialogComponent', () => {
  let component: PidDialogComponent;
  let fixture: ComponentFixture<PidDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PidDialogComponent]
    });
    fixture = TestBed.createComponent(PidDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
