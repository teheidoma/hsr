import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationErrortokenComponent } from './registration-errortoken.component';

describe('RegistrationErrortokenComponent', () => {
  let component: RegistrationErrortokenComponent;
  let fixture: ComponentFixture<RegistrationErrortokenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationErrortokenComponent]
    });
    fixture = TestBed.createComponent(RegistrationErrortokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
