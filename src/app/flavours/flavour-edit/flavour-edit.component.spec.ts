import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavourEditComponent } from './flavour-edit.component';

describe('FlavourEditComponent', () => {
  let component: FlavourEditComponent;
  let fixture: ComponentFixture<FlavourEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavourEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavourEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
