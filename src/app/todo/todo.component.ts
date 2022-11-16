import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { TodoTask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: TodoTask[] = [];
  inprogress: TodoTask[] = [];
  done: TodoTask[] = [];
  updateId!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false
    })
  }

  onEdit(item: TodoTask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateId = i;
    this.isEditEnabled = true;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgress(i: number) {
    this.inprogress.splice(i, 1);
  }

  drop(event: CdkDragDrop<TodoTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
