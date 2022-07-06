import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frequency } from './frequency.component';

describe('Frequency', () => {
  let component: Frequency;
  let fixture: ComponentFixture<Frequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Frequency ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Frequency);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
