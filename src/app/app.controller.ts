import { Controller, Get, Res, Param, Render } from '@nestjs/common';
import { GithubService } from "../services/index";

@Controller()
export class AppController {

    @Get('/')
    root(@Res() res) {
        res.sendFile("/public/index.html");
    }

    @Get("/:owner/:repo")
    @Render('details.hbs')
    async details(@Param("owner") owner, @Param("repo") repo, @Res() res): Promise<any> {
        // TODO: IF this repo exists
        const service = new GithubService();
        try {
            let valid = await service.isValidGithubRepo(owner, repo);
            console.log({ valid, owner, repo });
            if (valid) {
                return { valid, owner, repo };

            }
            return { error: "this is private" };

        } catch (e) {
            return res.json({ valid: false });
        }
    }

}
