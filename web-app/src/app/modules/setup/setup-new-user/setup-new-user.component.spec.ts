import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupNewUserComponent } from './setup-new-user.component';

describe('SetupNewUserComponent', () => {
  let component: SetupNewUserComponent;
  let fixture: ComponentFixture<SetupNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
