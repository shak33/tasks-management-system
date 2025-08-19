import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from './tasks.service';
import type { Task } from './task.model';
import { CreateTaskDto } from './create-task.dto';
import { FindOneParams } from './find-one.params';
import { UpdateTaskDto } from './update-task.dto';
import { WrongTaskStatusException } from './exceptions/wrong-task-status.exception';

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
    @Body() data: UpdateTaskDto,
  ): Task {
    const task = this.findOneOrFail(params.id);

    try {
      return this.tasksService.updateTask(task, data);
    } catch (error) {
      if (error instanceof WrongTaskStatusException) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param() params: FindOneParams) {
    const task = this.findOneOrFail(params.id);

    this.tasksService.delete(task);
  }
}
