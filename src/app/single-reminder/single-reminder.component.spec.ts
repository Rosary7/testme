import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReminderComponent } from './single-reminder.component';

describe('SingleReminderComponent', () => {
  let component: SingleReminderComponent;
  let fixture: ComponentFixture<SingleReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
