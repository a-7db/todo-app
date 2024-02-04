import { Component, OnInit } from '@angular/core';
import { AddToDoService } from 'src/app/services/add-to-do.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  taskName: any = '';

  constructor(private TaskService: AddToDoService) { }

  ngOnInit(): void {
  }

  addToDo(){
    this.TaskService.addTask(this.taskName);
    this.taskName = ''
  }
}
