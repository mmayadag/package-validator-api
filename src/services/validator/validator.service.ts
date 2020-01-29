import { TEMP_PATH, RESULT_FILE } from "../../config";
import { FileService } from "../file.service";
import { validatePackageFile } from "./npm.validator.service";

class ValidatorService {
  constructor(private fileService?: FileService) {
    this.fileService = new FileService();
  }

  async validatePackgeJson(
    owner: string,
    repo: string,
    data: any,
    response?: any
  ) {
    const packageData = JSON.parse(data),
      path = [TEMP_PATH, owner, repo].join("/"),
      fileName = `${path}/package.json`,
      resultFile = `${path}/${RESULT_FILE}`;
    this.fileService.saveToTemp(fileName, packageData);

    const saveToResultFile = upgraded => {
      this.fileService.saveToTemp(resultFile, upgraded);
    };

    let callback = upgraded => {
      saveToResultFile(upgraded);
      response(upgraded);
    };
    validatePackageFile(path, callback);
  }
}

export { ValidatorService };
