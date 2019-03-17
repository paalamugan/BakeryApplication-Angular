import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavourListComponent } from './flavour-list.component';

describe('FlavourListComponent', () => {
  let component: FlavourListComponent;
  let fixture: ComponentFixture<FlavourListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavourListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
