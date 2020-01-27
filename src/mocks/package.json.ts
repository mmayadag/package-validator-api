export default {
    "name": "package-validator",
    "version": "1.0.0",
    "description": "Check all dependencies from package.json and composer.json. Periodically send validation report to user's email",
    "main": "index.js",
    "repository": "git@github.com:mmayadag/package-validator.git",
    "author": "Murat Mayadağ",
    "license": "MIT",
    "private": true,
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "dotenv": "^8.1.0",
        "graphql-request": "^1.4.2",
        "npm-check": "^5.9.0",
        "npm-check-updates": "^4.0.1",
        "lodash": "3.10",
        "jquery": "3.0"
    },
    "type": "module",
    "engines": {
        "node": ">=13.5.0",
        "npm": ">=6.13.4"
    }
}
;