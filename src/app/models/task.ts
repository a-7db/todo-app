export class Task {
    ID: number;
    Task_name: string;
    IsCompleted: boolean;
    constructor(ID: number, Task_name: string, IsCompleted: boolean){
        this.ID = ID;
        this.Task_name = Task_name;
        this.IsCompleted = IsCompleted;
    }
}
