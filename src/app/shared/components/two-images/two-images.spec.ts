import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoImages } from './two-images';

describe('TwoImages', () => {
  let component: TwoImages;
  let fixture: ComponentFixture<TwoImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
