import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./tasks/tasks.module";
import { RepoModule } from "./repo/repo.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TasksModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public")
    }),
    RepoModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
