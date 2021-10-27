import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbecueDetailsComponent } from './barbecue-details.component';

describe('ItemDetailsComponent', () => {
  let component: BarbecueDetailsComponent;
  let fixture: ComponentFixture<BarbecueDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarbecueDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbecueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
