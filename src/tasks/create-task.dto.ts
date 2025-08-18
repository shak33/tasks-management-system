import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TaskStatusEnum } from "./task.model";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
