import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPracticeComponent } from './for-practice.component';

describe('ForPracticeComponent', () => {
  let component: ForPracticeComponent;
  let fixture: ComponentFixture<ForPracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForPracticeComponent]
    });
    fixture = TestBed.createComponent(ForPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
