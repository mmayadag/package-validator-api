import { IsEmpty } from 'class-validator';
import { HttpStatus, Logger } from '@nestjs/common';
import {
  GithubService,
  EmailService,
  createMail,
  ValidatorService
} from './index';

class AppService {
  private readonly logger: Logger = new Logger('WorkService');

  private gitHubService: GithubService = new GithubService();

  private validatorService: ValidatorService = new ValidatorService();

  private emailService: EmailService = new EmailService();

  async start(
    repoDTO: { owner: string; repo: string; email?: string },
    res?: any
  ) {
    const { owner, repo, email } = repoDTO;
    const valid = await this.gitHubService.isValidGithubRepo(owner, repo);
    if (valid === false) {
      if (res) {
        return res.status(HttpStatus.BAD_REQUEST).json({ valid });
      }
    }
    const data = await this.getRepoDetails(owner, repo, res);

    const to = email;
    const type = 'npm';

    const response = result => {
      const email = createMail(result, type);

      if (to != undefined) {
        console.log({ to });
        this.emailService.sendEmail(email, to, owner, repo);
      }

      if (res) {
        console.log(typeof res);
        return res.json(email);
      }
      this.logger.debug({ email });
    };
    try {
      await this.validatorService
        .validatePackgeJson(owner, repo, data, response)
        .catch(error => console.error(error));
    } catch (e) {
      if (res) {
        return res.status(HttpStatus.BAD_REQUEST).json({ html: e });
      }
    }
  }

  async getRepoDetails(owner: string, repo: string, res?: any): Promise<any> {
    const data = await this.gitHubService.getRepoDetails(owner, repo);
    if (Object.keys(data).length == 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({ html: 'content not found' });
    }
    return data;
  }
}
export { AppService };
