import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";
import { TasksService } from "./tasks.service";

@Controller("task")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll() {
    return this.tasksService.getAll();
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.tasksService.updateTask(id, body);
  }
}