import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalesReportComponent } from './all-sales-report.component';

describe('AllSalesReportComponent', () => {
  let component: AllSalesReportComponent;
  let fixture: ComponentFixture<AllSalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
