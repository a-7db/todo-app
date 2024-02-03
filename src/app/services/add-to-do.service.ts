import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class AddToDoService {
  private _completedTasks: Task[] = [];
  private _inCompletedTasks: Task[] = [];
  
  constructor() { 
    if(localStorage.getItem('tasks')){
      this._completedTasks = JSON.parse(localStorage.getItem('tasks') as string);
      this._inCompletedTasks = JSON.parse(localStorage.getItem('tasks') as string);
    } else{
      localStorage.setItem('tasks', '');
    }
  }

  getCompletedTasks(){
    this._completedTasks = this._completedTasks.filter(({ IsCompleted }) => {
      return IsCompleted == true;
    });

    return this._completedTasks;
  }
  getInCompletedTasks(){
    this._inCompletedTasks = this._inCompletedTasks.filter(({IsCompleted}) => {
      return IsCompleted != true;
    });

    return this._inCompletedTasks;
  }

  addTask(TaskName: string){
    const newTask: Task = {
      ID: GenerateID(),
      Task_name: TaskName,
      IsCompleted: false
    }
    this._inCompletedTasks.push(newTask);
  }
}
function GenerateID(): number {
  let getLastElement: Task[] = JSON.parse(localStorage.getItem('tasks') as string);
  return ++getLastElement[getLastElement.length -1].ID;
}

