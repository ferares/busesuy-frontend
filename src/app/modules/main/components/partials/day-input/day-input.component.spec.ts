import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayInputComponent } from './day-input.component';

describe('DayInputComponent', () => {
  let component: DayInputComponent;
  let fixture: ComponentFixture<DayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
