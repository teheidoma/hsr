import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishCardComponent } from './wish-card.component';

describe('WishCardComponent', () => {
  let component: WishCardComponent;
  let fixture: ComponentFixture<WishCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishCardComponent]
    });
    fixture = TestBed.createComponent(WishCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
