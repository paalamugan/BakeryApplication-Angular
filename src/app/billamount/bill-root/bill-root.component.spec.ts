import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRootComponent } from './bill-root.component';

describe('BillRootComponent', () => {
  let component: BillRootComponent;
  let fixture: ComponentFixture<BillRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
