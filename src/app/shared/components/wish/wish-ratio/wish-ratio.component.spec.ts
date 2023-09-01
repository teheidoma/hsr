import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishRatioComponent } from './wish-ratio.component';

describe('WishRatioComponent', () => {
  let component: WishRatioComponent;
  let fixture: ComponentFixture<WishRatioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishRatioComponent]
    });
    fixture = TestBed.createComponent(WishRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
