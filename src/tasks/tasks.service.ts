import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(data: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      ...data,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(task: Task, updateTaskDto: UpdateTaskDto): Task {
    Object.assign(task, updateTaskDto);
    return task;
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id !== task.id,
    );
  }
}
