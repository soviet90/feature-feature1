import { CommonModule, } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ModalAddTask } from '../modal-add-task/modal-add-task';
import { Api } from '../api';
@Component({
  selector: 'app-modal-update-task',
  standalone: true,
  imports: [// Angular modules
    FormsModule,
    CommonModule,
    // Material modules
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,],
  templateUrl: './modal-update-task.html',
  styleUrl: './modal-update-task.css'
})
export class ModalUpdateTask {
  constructor(public dialogRef: MatDialogRef<ModalUpdateTask>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: Api
  ) { }

  task = {
    title: '',
    description: '',
    tags: [] as string[]
  };
  newTag = '';

  addTag(event: KeyboardEvent): void {
    console.log('Adding tag:', this.data.tags);
  if (this.data.tags.trim()) {
    this.task.tags.push(this.data.tags.trim());
   
    this.newTag = ''; // Clear the input
  }
  this.data.tags = this.task.tags
   console.log(this.task.tags);
  event.preventDefault(); // Prevent default Enter behavior
}

  onEnterPress(event: Event): void {
    this.addTag(event as KeyboardEvent);
  }
  removeTag(tag: string) {
    this.data.tags = this.data.tags.filter((t: string) => t !== tag);
  }

  save(id: any): void {

    console.log('Updating task with ID:', id, 'and data:', this.data.tags);
    this.api.updateTodoList(this.data.id, this.data.tags).subscribe({
      next: (response) => {
        console.log('Task updated:', response);
        this.dialogRef.close(this.task);
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }
}
