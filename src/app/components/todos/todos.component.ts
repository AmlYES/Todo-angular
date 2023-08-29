import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[];
  inputTodo: FormControl = new FormControl(null, [Validators.required]);

  constructor(private n:StorageService) {
    this.inputTodo.valueChanges.subscribe(() => {
      console.log(this.inputTodo);

    })
  }

  ngOnInit(): void {
    this.todos = [
      {
        content: 'First todo',
        completed: false
      },
      {
        content: 'Second todo',
        completed: true
      }
    ]

  }

  toggleDone(doneTaskId: number) {
    this.todos.map((value, index) => {
      if (index == doneTaskId) {
        value.completed = !value.completed;
      }
      return value;
    })
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(
      // we are going to return all the tasks except the one we need to delete
      (value, index) => index !== id
    );
    this.todos.splice(id,1)
  }

  addTodo() {
    if (this.inputTodo.invalid) return
    this.todos.push({
      // input todo we bind it already as an attribute to the component
      content: this.inputTodo.value,
      completed: false
    });

    this.inputTodo.reset();
  }


}
