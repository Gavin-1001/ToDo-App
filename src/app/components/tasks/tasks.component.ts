import {Component, OnInit} from '@angular/core';
import {Task} from "../../model/Task";
import {TaskService} from "../../services/task.service";


@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    tasks: Task[] = [];

    constructor(private taskService: TaskService) {
        this.taskService.getTasks();
    }

    ngOnInit(): void {
        this.taskService.getTasks().subscribe((tasks) => (
            this.tasks = tasks));
    }

    deleteTask(task: Task) {
        this.taskService.deleteTask(task).subscribe(() => (
            this.tasks = this.tasks.filter((t) => t.id !== task.id)
        ));
    }

    toggleReminder(task: Task) {
        task.reminder = !task.reminder; //sets it to the opposite of what the reminder is
        console.log(task.reminder);
        this.taskService.updateTaskReminder(task).subscribe();
    }

    addTask(task: Task) {
        console.log(task);
        this.taskService.addTask(task).subscribe((task) => (
            this.tasks.push(task)
        ));
    }
}
