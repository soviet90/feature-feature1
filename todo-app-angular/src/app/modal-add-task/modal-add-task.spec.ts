import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTask } from './modal-add-task';
import { MatButtonModule } from '@angular/material/button'

describe('ModalAddTask', () => {
  let component: ModalAddTask;
  let fixture: ComponentFixture<ModalAddTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
