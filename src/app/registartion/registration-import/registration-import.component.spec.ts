import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationImportComponent } from './registration-import.component';

describe('RegistrationImportComponent', () => {
  let component: RegistrationImportComponent;
  let fixture: ComponentFixture<RegistrationImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationImportComponent]
    });
    fixture = TestBed.createComponent(RegistrationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
