import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService
  ) {

  }

  @Get()
  public findAll(): Task[] {
    return this.tasksService.findAll();
  }

  // @Get('/:id/:testId')
  // public findOneTest(@Param('id') id: string, @Param('testId') testId: string): string {
  //   return `The number is ${id} and the test ID is ${testId}`
  // }

  @Get('/:id')
  public findOne(@Param('id') id: string): Task {
    const task = this.tasksService.findOne(id);

    if (task) {
      return task;
    }

    throw new NotFoundException(`Task with ID "${id}" not found`);
  }

  @Post()
  public create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }
}
