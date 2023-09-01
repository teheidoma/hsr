import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStartComponent } from './registration-start.component';

describe('RegistrationComponent', () => {
  let component: RegistrationStartComponent;
  let fixture: ComponentFixture<RegistrationStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationStartComponent]
    });
    fixture = TestBed.createComponent(RegistrationStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
