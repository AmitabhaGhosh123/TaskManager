import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewtaskComponent } from './createnewtask.component';

describe('CreatenewtaskComponent', () => {
  let component: CreatenewtaskComponent;
  let fixture: ComponentFixture<CreatenewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatenewtaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatenewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
