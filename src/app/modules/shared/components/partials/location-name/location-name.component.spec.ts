import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationName } from './location-name.component';

describe('LocationName', () => {
  let component: LocationName;
  let fixture: ComponentFixture<LocationName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationName ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
