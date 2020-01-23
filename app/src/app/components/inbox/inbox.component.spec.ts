import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { inboxComponent } from './inbox.component';

describe('inboxComponent', () => {
  let component: inboxComponent;
  let fixture: ComponentFixture<inboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ inboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(inboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
