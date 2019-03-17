import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavourAddComponent } from './flavour-add.component';

describe('FlavourAddComponent', () => {
  let component: FlavourAddComponent;
  let fixture: ComponentFixture<FlavourAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavourAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavourAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
