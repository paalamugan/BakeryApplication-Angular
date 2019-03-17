import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstockComponent } from './instock.component';

describe('InstockComponent', () => {
  let component: InstockComponent;
  let fixture: ComponentFixture<InstockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
