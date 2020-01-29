import { Injectable, HttpException } from "@nestjs/common";
import { REPOS } from "../mocks/repos.mock";

@Injectable()
export class RepoService {
  repos = REPOS;

  getRepos(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.repos);
    });
  }

  getRepo(repoID): Promise<any> {
    let id = Number(repoID);
    return new Promise(resolve => {
      const repo = this.repos.find(repo => repo.id === id);
      if (!repo) {
        throw new HttpException("Repo does not exist!", 404);
      }
      resolve(repo);
    });
  }

  addRepo(repo): Promise<any> {
    return new Promise(resolve => {
      this.repos.push(repo);
      resolve(this.repos);
    });
  }

  deleteRepo(repoID): Promise<any> {
    let id = Number(repoID);
    return new Promise(resolve => {
      let index = this.repos.findIndex(repo => repo.id === id);
      if (index === -1) {
        throw new HttpException("Book does not exist!", 404);
      }
      this.repos.splice(1, index);
      resolve(this.repos);
    });
  }
}
