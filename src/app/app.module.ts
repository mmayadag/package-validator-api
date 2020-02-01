import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "../tasks/tasks.module";
import { RepoModule } from "../repo/repo.module";
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    RepoModule,
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule { }

