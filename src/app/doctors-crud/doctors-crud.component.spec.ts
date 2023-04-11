import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsCRUDComponent } from './doctors-crud.component';

describe('DoctorsCRUDComponent', () => {
  let component: DoctorsCRUDComponent;
  let fixture: ComponentFixture<DoctorsCRUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsCRUDComponent]
    });
    fixture = TestBed.createComponent(DoctorsCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
