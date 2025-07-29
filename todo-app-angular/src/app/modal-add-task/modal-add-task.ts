import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent,MatChipListbox  } from '@angular/material/chips';


@Component({
  selector: 'app-modal-add-task',
  imports: [CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
  MatDialogModule],
  templateUrl: './modal-add-task.html',
  styleUrl: './modal-add-task.css'
})
export class ModalAddTask {
  constructor(
    public dialogRef: MatDialogRef<ModalAddTask>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  @ViewChild('chipList') chipListRef!: MatChipListbox;
  chipListInstance!: MatChipListbox;

  ngAfterViewInit(): void {
    this.chipListInstance = this.chipListRef;
  }

  item = {
    id: 1,
    tags: ['example']
  };
  newTag: string = '';


  addTag(event: KeyboardEvent) {
    event.preventDefault(); // prevent form submission

    const trimmedTag = this.newTag.trim();
    if (trimmedTag && !this.item.tags.includes(trimmedTag)) {
      this.item.tags.push(trimmedTag);
    }

    this.newTag = '';
  }

  removeTag(tagToRemove: string) {
    this.item.tags = this.item.tags.filter(tag => tag !== tagToRemove);
  }

  onTagClick(itemId: number) {
    console.log('Tag clicked for item:', itemId);
  }

  
  onNoClick(): void {
    // Logic to close the modal without saving
  }

  onSaveClick(): void {
    // Logic to save the new task
    console.log('Task saved:', this.data);
    this.dialogRef.close(this.data);
  }

 tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  // addTag(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim();
  //   if (value) {
  //     this.tags.push(value);
  //   }
  //   event.chipInput?.clear();
  // }

  // removeTag(tag: string): void {
  //   this.tags = this.tags.filter(t => t !== tag);
  // }
}
