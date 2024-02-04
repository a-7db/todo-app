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
      ID: this.GenerateID(),
      Task_name: TaskName,
      IsCompleted: false
    }

    this._inCompletedTasks.push(newTask);
    const updatedTasks = this.concat_tasks(this._completedTasks, this._inCompletedTasks)
    this.StoreLocalStorge(updatedTasks);
  }

  switchTasks(satuts: boolean, task: Task){
    switch(satuts){
      case true:
        this.done_of_task(task);
        break;

      case false:
        this.not_compelte_task(task);
        break;

      default: return;
    }
  }

  private GenerateID(): number {
    let getLastElement: Task[] = JSON.parse(localStorage.getItem('tasks') as string);
    return ++getLastElement[getLastElement.length - 1].ID;
  }

  private StoreLocalStorge(tasks: Task[]){
    let tasks_string: string = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks_string);
  }

  private concat_tasks(firstArray: Task[], secondArray: Task[]): Task[] {
    let concat_tasks: Task[] = firstArray.concat(secondArray);
    concat_tasks.sort((a: Task, b: Task) => a.ID - b.ID)
    return concat_tasks;
  }

  private async done_of_task(task: Task){
    // remove it from _incompletedTasks
    const index = this._inCompletedTasks.indexOf(task);

    await this.removeTask(index, this._inCompletedTasks);
    
    // update status for received task
    task.IsCompleted = true;

    // add updated task to _completedTasks
    this._completedTasks.push(task);

    // concat & sort tasks arraus
    const tasks: Task[] = this.concat_tasks(this._completedTasks, this._inCompletedTasks);

    // update localStorage
    this.StoreLocalStorge(tasks);
  }

  private async not_compelte_task(task: Task) {
    // remove it from _completedTasks
    const index = this._completedTasks.indexOf(task);

    await this.removeTask(index, this._completedTasks);

    // update status for received rask
    task.IsCompleted = false;

    // add updated task to _inCompletedTasks
    this._inCompletedTasks.push(task);

    // concat & sort arrays
    const tasks = this.concat_tasks(this._completedTasks, this._inCompletedTasks);

    // update LocalStorage
    this.StoreLocalStorge(tasks);
  }

  private removeTask(index: number, taskArray: Task[]){
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        if(taskArray.splice(index, 1)){
          resolve("done");
        }

      }, 500)
    })
  }
}

