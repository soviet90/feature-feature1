import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ColorSketchModule } from 'ngx-color/sketch';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule,ColorSketchModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app-angular');
  tableData = [
    { id: 1, name: 'Task 1', description: 'Complete the Angular project', completed: '' , Status: '',color: '#ffffff' },
    { id: 2, name: 'Task 2', description: 'Review the code',completed: '',Status: '',color: '#d4edda' },
    { id: 3, name: 'Task 3', description: 'Deploy the application',completed: '',Status: '',color: '#d4edda' }
  ]

  setCompleted(id: number) {
    const item = this.tableData.find(item => item.id === id);
    if (item) {
      item.completed = item.completed ? '' : 'completed';
      item.Status = item.completed ? 'Completed' : 'Not Completed';
      console.log(`Item with id ${id} completed status set to: ${item.completed}`);
    }
  }

  color = '#000';
onColorChange(e: any) {
  this.color = e.color.hex;
}
}
