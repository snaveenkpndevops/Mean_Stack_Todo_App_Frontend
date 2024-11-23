// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoAddComponent } from './MyComponents/todo-add/todo-add.component';
import { WebrequestService } from './service/webrequest.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TodoAddComponent, CommonModule, NgIf, FormsModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Your App Title';
    tasks: any[] = [];
    edit: boolean = false;
    editTask: any = {};

    constructor(private webrequest: WebrequestService) { }

    ngOnInit(): void {
        this.getTasks();
    }

    getTasks(): void {
        this.webrequest.get('tasks').subscribe(
            (res: any) => {
                this.tasks = res;
                console.log(this.tasks);
            },
            (error: any) => {
                console.error('Error fetching tasks:', error);
            }
        );
    }

    addTask(task: any): void {
        this.webrequest.post('tasks', task).subscribe(
            (res: any) => {
                console.log('Task added:', res);
                this.getTasks();
            },
            (error: any) => {
                console.error('Error adding task:', error);
            }
        );
    }

    handleDelete(task: any): void {
        this.webrequest.delete('tasks/' + task._id, {}).subscribe(
            (res: any) => {
                console.log('Task Deleted:', res);
                this.getTasks();
            },
            (error: any) => {
                console.log(error);
                console.error('Error Deleting task:', error);
            }
        );
    }

    handleEdit(task: any): void {
        this.edit = true;
        console.log(task);
        this.editTask = task;
        console.log(task);
    }

    handleComplete(task: any): void {
        this.webrequest
            .put('tasks/' + task._id, {
                name: task.name,
                desc: task.desc,
                deadline: task.deadline,
                completed: true,
            })
            .subscribe(
                (res: any) => {
                    console.log('Task Updated:', res);
                    this.getTasks();
                },
                (error: any) => {
                    console.error('Error Updating task:', error);
                }
            );
    }

    handleUpdate(task: any): void {
        console.log(task.name);
        console.log(task);
        this.edit = false;
        this.webrequest
            .put('tasks/' + task._id, {
                name: task.name,
                desc: task.desc,
                deadline: task.deadline,
            })
            .subscribe(
                (res: any) => {
                    console.log('Task Updated:', res);
                    this.getTasks();
                },
                (error: any) => {
                    console.error('Error Updating task:', error);
                }
            );
    }
}