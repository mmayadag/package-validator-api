/*import path from 'path';
import fs from 'fs';
*/
const path = require('path');
const fs = require('fs');

//import { TEMP_PATH } from '../config';
const ROOT_PATH = process.cwd();

class FileService {

    fullpath(fileName: string) {
        return path.join(ROOT_PATH, fileName);
    }

    read(fileName: string) {
        if (!fs.existsSync(this.fullpath(fileName))) {
            console.log(`${fileName} file not exists`);
        }

        return fs.readFileSync(this.fullpath(fileName)).toString();

    }

    save(fileName: string, content: any, callback?: any) {
        fs.writeFile(fileName, content, function (err) {
            if (err) throw err;
            console.log(`${fileName} - Saved!`);
            callback = callback || function () { };
            callback();
        });
    }

    readResult(fileName: string) {
        return JSON.parse(this.read(fileName));
    }

    // convert DATA to string than save
    saveToTemp(fileName: string, data: any) {
        const curDir = path.dirname(fileName);
        //console.log({ curDir });
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(curDir, { recursive: true });
        }
        this.save(this.fullpath(fileName), JSON.stringify(data))
    }
}



export {
    FileService
}