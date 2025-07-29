import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalAddTask } from './modal-add-task/modal-add-task';
import { Api } from './api'
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ModalUpdateTask } from './modal-update-task/modal-update-task';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule, MatDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app-angular');
  constructor(private dialog: MatDialog, private api: Api) { }
  tasks: any[] = [];

  tableData: {
    id: number;
    name: string;
    description: string;
    completed: string;
    Status: string;
  }[] = [

    ]

  confirmatioMessage = ''
  addTaskDialog(): void {
    const dialogRef = this.dialog.open(ModalAddTask, {
      width: '250px',
      data: { tittle: '', description: '', completed: false, tags: [] } // Initial data for the modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newTask = {
          tittle: result.tittle,
          description: result.description,
          completed: result.completed ?? false,
          tags: result.tags || ''
        };
        console.log('The dialog was closed with result:', newTask);
        this.api.addTodoList(newTask).subscribe({
          next: (response) => {
            console.log('Task added:', response);
            this.ngOnInit();
          },
          error: (error) => {
            console.log('Error adding task:', error);
          }
        })
      }

    });
  }

  ngOnInit() {
    this.api.getTodoList().subscribe(data => {
      this.tasks = data
      console.log('Tasks fetched:', this.tasks);
    })
  }



  setCompleted(id: number): void {
    this.api.getTodoListById(id).subscribe(item => {
      console.log('Item found:', item);
      if (item) {

        const dialogRef = this.dialog.open(ModalUpdateTask, {
          width: '250px',
          data: { id: item.id, tittle: item.tittle, description: item.description, completed: item.completed, tags: item.tags } // Initial data for the modal
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            window.location.reload()// ✅ Refresh table here
          }
        });
      }
    })

  }



  onTagClick(tag: any) {
    this.api.getTodoListById(tag).subscribe(data => {
      console.log('Tag clicked:', data);
    })
    console.log('Clicked:', tag);
  }

  removeTag(tag: string) {
    this.tasks = this.tasks.filter(t => t !== tag);
  }
}





