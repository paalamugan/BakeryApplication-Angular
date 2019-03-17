import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportPrintComponent } from './sales-report-print.component';

describe('SalesReportPrintComponent', () => {
  let component: SalesReportPrintComponent;
  let fixture: ComponentFixture<SalesReportPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
