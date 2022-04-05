import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDataComponent } from './company-data.component';

describe('CompanyDataComponent', () => {
  let component: CompanyDataComponent;
  let fixture: ComponentFixture<CompanyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
