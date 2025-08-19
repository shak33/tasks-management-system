import { Injectable } from '@nestjs/common';
import { Task, TaskStatusEnum } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { randomUUID } from 'crypto';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

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
    if (updateTaskDto.status && !this.isValidStatusTransition(task.status, updateTaskDto.status)) {
      throw new WrongTaskStatusException();
    }
    Object.assign(task, updateTaskDto);
    return task;
  }

  private isValidStatusTransition(
    currentStatus: TaskStatusEnum,
    newStatus: TaskStatusEnum,
  ): boolean {
    const statusOrder = [
      TaskStatusEnum.OPEN,
      TaskStatusEnum.IN_PROGRESS,
      TaskStatusEnum.DONE,
    ];

    return statusOrder.indexOf(currentStatus) <= statusOrder.indexOf(newStatus);
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(
      (filteredTask) => filteredTask.id !== task.id,
    );
  }
}
