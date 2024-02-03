import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { AddToDoService } from 'src/app/services/add-to-do.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  color: ThemePalette = 'primary'
  completedTasks: Task[] = [];
  InCompletedTasks: Task[] = [];

  constructor(private TaskService: AddToDoService) {  }

  ngOnInit(): void {
    this.completedTasks = this.TaskService.getCompletedTasks();
    this.InCompletedTasks = this.TaskService.getInCompletedTasks();
  }

  removeTask(taskID: number){

  }
  
}
