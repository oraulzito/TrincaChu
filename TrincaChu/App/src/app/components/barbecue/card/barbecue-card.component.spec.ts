import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarbecueCardComponent} from './barbecue-card.component';

describe('ItemCardComponent', () => {
  let component: BarbecueCardComponent;
  let fixture: ComponentFixture<BarbecueCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BarbecueCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbecueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
