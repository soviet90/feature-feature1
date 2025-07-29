import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateTask } from './modal-update-task';

describe('ModalUpdateTask', () => {
  let component: ModalUpdateTask;
  let fixture: ComponentFixture<ModalUpdateTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateTask]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
