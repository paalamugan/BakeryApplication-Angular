import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcheckComponent } from './printcheck.component';

describe('PrintcheckComponent', () => {
  let component: PrintcheckComponent;
  let fixture: ComponentFixture<PrintcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
