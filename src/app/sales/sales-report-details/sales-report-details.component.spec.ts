import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportDetailsComponent } from './sales-report-details.component';

describe('SalesReportDetailsComponent', () => {
  let component: SalesReportDetailsComponent;
  let fixture: ComponentFixture<SalesReportDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
