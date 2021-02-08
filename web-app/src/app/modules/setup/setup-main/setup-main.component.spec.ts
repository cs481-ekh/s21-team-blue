import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupMainComponent } from './setup-main.component';

describe('SetupMainComponent', () => {
  let component: SetupMainComponent;
  let fixture: ComponentFixture<SetupMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
