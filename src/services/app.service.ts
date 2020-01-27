import { HttpStatus, Logger } from '@nestjs/common';
import { GithubService, EmailService, createMail, ValidatorService } from './index';

class AppService {
    logger: Logger;
    gitHubService: GithubService;
    validatorService: ValidatorService;
    emailService: EmailService;

    constructor() {
        this.logger = new Logger('WorkService');
        this.gitHubService = new GithubService();
        this.validatorService = new ValidatorService();
        this.emailService = new EmailService();

    }
    async start(repoDTO: { owner: string, repo: string, email: string }, res?: any) {

        const { owner, repo, email } = repoDTO;
        let valid = await this.gitHubService.isValidGithubRepo(owner, repo);
        if (valid === false) {
            if (res) {
                return res.status(HttpStatus.BAD_REQUEST).json({ valid });
            }
        }
        let data = await this.gitHubService.getRepoDetails(owner, repo);

        let to = email;
        let type = "npm";

        let response = (result) => {
            const email = createMail(result, type);
            this.emailService.sendEmail(email, to, owner, repo);
            if (res) {
                console.log(typeof res);
                return res.json(email);
            }
            this.logger.debug({ email });
        }
        try {
            await this.validatorService.validatePackgeJson(owner, repo, data, to, response).catch(error => console.error(error))

        } catch (e) {
            if (res) {
                return res.status(HttpStatus.BAD_REQUEST).json({ html: e });
            }
        }
    }
}
export {
    AppService
}