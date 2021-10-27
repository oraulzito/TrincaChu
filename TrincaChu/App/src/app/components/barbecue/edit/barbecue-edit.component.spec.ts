import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbecueEditComponent } from './barbecue-edit.component';

describe('ItemEditComponent', () => {
  let component: BarbecueEditComponent;
  let fixture: ComponentFixture<BarbecueEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarbecueEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarbecueEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
