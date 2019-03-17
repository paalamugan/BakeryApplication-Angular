import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalesReportEditComponent } from './all-sales-report-edit.component';

describe('AllSalesReportEditComponent', () => {
  let component: AllSalesReportEditComponent;
  let fixture: ComponentFixture<AllSalesReportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSalesReportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalesReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
