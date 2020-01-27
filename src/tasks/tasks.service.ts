import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { AppService } from '../services/index';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    @Cron('45 * * * * *')
    async handleCron() {
        this.logger.debug('Called when the second is 45');
    }

    @Cron('* 0/24 * * *')
    async every24h() {
        this.logger.debug('Called every 24h');
        let json = { "email": "murat-2@hotmail.com", "period": 24, "owner": "mmayadag", "repo": "bicycle-in-izmir" };
        let { email, repo, owner } = json;
        let workservice = new AppService();
        await workservice.start({ email, repo, owner });
    }

    @Interval(10000)
    handleInterval() {
        this.logger.debug('Called every 10 seconds');
    }
}