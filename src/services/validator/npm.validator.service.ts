const ncu = require('npm-check-updates');

const validate = (path: string, callback?: any) => {
  ncu
    .run({
      packageFile: `${path}/package.json`,
      // jsonUpgraded: true,
      // loglevel: 'verbose',
      jsonDeps: true,
      // packageManager: 'npm',
      newest: true,
      greatest: true
    })
    .then(upgraded => {
      callback(upgraded);
    });
};

const validatePackageFile = (path: string, callback?: any) => {
  validate(path, callback);
};
export { validatePackageFile };
