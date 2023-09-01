import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFinishComponent } from './registration-finish.component';

describe('RegistrationFinishComponent', () => {
  let component: RegistrationFinishComponent;
  let fixture: ComponentFixture<RegistrationFinishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFinishComponent]
    });
    fixture = TestBed.createComponent(RegistrationFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
