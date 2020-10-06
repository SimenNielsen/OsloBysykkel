import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestThreeProductComponent } from './highest-three-product.component';

describe('HighestThreeProductComponent', () => {
  let component: HighestThreeProductComponent;
  let fixture: ComponentFixture<HighestThreeProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestThreeProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestThreeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
