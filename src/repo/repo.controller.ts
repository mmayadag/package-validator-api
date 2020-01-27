import { ValidationPipe } from './validation.pipe';
import { Controller, Get, Res, Body, Param, Post, HttpStatus, HttpCode } from '@nestjs/common';
import RepoDTO from './dto/repo.dto';
import { RepoService } from './repo.service';
import { AppService, GithubService } from '../services/index';

@Controller('repo')
export class RepoController {
    constructor(private repoService: RepoService) {
    }

    @Get('details/:owner/:repo')
    details(@Param('owner') owner, @Param('repo') repo): string {
        // TODO: IF this repo exists
        return `Details: ${owner} / ${repo}`;
    }
    @Get('isValid/:owner/:repo')
    @HttpCode(HttpStatus.OK)
    async isValide(@Param('owner') owner, @Param('repo') repo, @Res() res): Promise<any> {
        const service = new GithubService();
        try {
            let valid = await service.isValidGithubRepo(owner, repo);
            return res.json({ valid });
        } catch (e) {
            return res.json({ valid: false });
        }
    }

    @Post('isValid')
    @HttpCode(HttpStatus.OK)
    async isValid(@Body(new ValidationPipe()) repoDTO: RepoDTO, @Res() res): Promise<any> {
        const { owner, repo } = repoDTO;
        const service = new GithubService();
        try {
            let valid = await service.isValidGithubRepo(owner, repo);
            return res.json({ valid });
        } catch (e) {
            return res.json({ valid: false });
        }
    }

    @Post('schedule')
    @HttpCode(HttpStatus.OK)
    async create(@Body(new ValidationPipe()) repoDTO: RepoDTO, @Res() res): Promise<any> {
        let { email, repo, owner } = repoDTO;
        console.log({ email, repo, owner });

        const service = new AppService();

        return await service.start({ repo, owner, email }, res);
    }

}
