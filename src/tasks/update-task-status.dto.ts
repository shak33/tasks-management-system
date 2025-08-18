import { IsNotEmpty, IsEnum } from "class-validator";
import { TaskStatusEnum } from "./task.model";

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
