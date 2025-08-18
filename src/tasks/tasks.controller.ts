import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskStatusDto } from './update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  public findAll(): Task[] {
    return this.tasksService.findAll();
  }

  // @Get('/:id/:testId')
  // public findOneTest(@Param('id') id: string, @Param('testId') testId: string): string {
  //   return `The number is ${id} and the test ID is ${testId}`
  // }

  @Get('/:id')
  public findOne(@Param() params: FindOneParams): Task {
    return this.findOneOrFail(params.id);
  }

  @Post()
  public create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  private findOneOrFail(id: string): Task {
    const task = this.tasksService.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return task;
  }

  @Patch('/:id')
  public update(
    @Param() params: FindOneParams,
    @Body() data: UpdateTaskStatusDto
  ): Task {
    const task = this.findOneOrFail(params.id);

    task.status = data.status;

    return task;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param() params: FindOneParams) {
    const task = this.findOneOrFail(params.id);

    this.tasksService.delete(task.id);
  }
}
