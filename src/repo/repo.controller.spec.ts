import { Test, TestingModule } from '@nestjs/testing';
import { RepoService } from './repo.service';
import { RepoController } from './repo.controller';

describe('Repo Controller', () => {
  let repoController: RepoController;
  let repoService: RepoService;

  beforeEach(() => {
    repoService = new RepoService();
    repoController = new RepoController(repoService);
  });
  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const owner = 'mmayadag';
      const repo = 's3-hello';
      const result = `Details: ${owner} / ${repo}`;
      expect(repoController.details(owner, repo)).toBe(result);
    });
  });
  /*
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [RepoController],
      }).compile();

      controller = module.get<RepoController>(RepoController);
    });

    it('should be defined', () => {
      // expect(controller).toBeDefined();
    });
    */
});
