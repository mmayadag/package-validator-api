import { GraphQLClient } from 'graphql-request';
import { TOKEN, TEMP_PATH, GITHUB_ENDPOINT } from '../config';
import { getFileTree, isValidRepo } from '../queries/index';

// import { saveToTemp } from './services/files';
// import { validatePackageFile } from './services/validate/npm';

interface IGithubService {
  makeRequest: (variables: any, query: string) => Promise<any>;

  isValidGithubRepo: (owner: string, repo: string) => Promise<boolean>;

  getRepoDetails: (owner: string, repo: string) => void;
}
class GithubService implements IGithubService {
  async makeRequest(variables: any, query: string): Promise<any> {
    try {
      const graphQLClient = new GraphQLClient(GITHUB_ENDPOINT, {
        headers: {
          authorization: `Bearer ${TOKEN}`
        }
      });

      const data = await graphQLClient.request(query, variables);
      return data;
    } catch (e) {
      return { error: e.body };
    }
  }

  async isValidGithubRepo(owner: string, repo: string): Promise<boolean> {
    const variables = { owner, repo };
    const query = isValidRepo;

    try {
      const data = await this.makeRequest(variables, query);
      if (data.repository == undefined || data.repository == null) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async getRepoDetails(owner: string, repo: string) {
    const variables = { owner, repo };
    const query = getFileTree;

    const data = await this.makeRequest(variables, query);

    const { entries = [] } = data.repository.object;
    const b = entries
      .filter(f => f.name.toLowerCase() === 'package.json')
      .map(i => i.object.text);

    // console.log(b);

    return b && b.length > 0 ? b[0] : {};
    /*
        //save('./tmp/cokceken/twitch-bot-js/package.json', b);
        const packageData = JSON.parse(b[0]),
            path = [TEMP_PATH, owner, name].join('/'),
            fileName = `${path}/package.json`;
        saveToTemp(fileName, packageData);
        const to = "murat-2@hotmail.com";
        validatePackageFile(path, to);
        */
  }
}
export { GithubService };
