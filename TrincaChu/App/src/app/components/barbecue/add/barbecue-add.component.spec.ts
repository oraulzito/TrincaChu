import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbecueAddComponent } from './barbecue-add.component';

describe('ItemAddComponent', () => {
  let component: BarbecueAddComponent;
  let fixture: ComponentFixture<BarbecueAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarbecueAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbecueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
