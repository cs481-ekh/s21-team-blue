import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingMainComponent } from './testing-main.component';

describe('TestingMainComponent', () => {
  let component: TestingMainComponent;
  let fixture: ComponentFixture<TestingMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
