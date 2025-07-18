import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class TasksService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getAll() {
    const cacheKey = 'tasks';

    let tasks = await this.cache.get(cacheKey);
    if (tasks) {
      return tasks;
    }

    tasks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'task.json'), 'utf-8'));

    await this.cache.set(cacheKey, tasks, 60_000); 
    return tasks;
  }

  async updateTask(id: number, updated: any) {
    let tasks = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'task.json'), 'utf-8'));

   const index = tasks.findIndex(task => task.id === String(id));
    if (index === -1) throw new Error('Tarefa não encontrada');

    tasks[index] = { ...tasks[index], ...updated };

    fs.writeFileSync(path.join(process.cwd(), 'data', 'task.json'), JSON.stringify(tasks, null, 2), 'utf-8');
    await this.cache.set('tasks', tasks); 

    return tasks[index];
  }
}
