import { Module } from '@nestjs/common';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';
//import { WorkService, GithubService } from '../services/index';

@Module({
    controllers: [RepoController],
    providers: [RepoService]
})
export class RepoModule { }
