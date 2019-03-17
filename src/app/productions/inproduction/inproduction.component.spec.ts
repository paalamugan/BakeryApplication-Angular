import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InproductionComponent } from './inproduction.component';

describe('InproductionComponent', () => {
  let component: InproductionComponent;
  let fixture: ComponentFixture<InproductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InproductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InproductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
