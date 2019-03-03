import {remote} from 'electron';
import glob from 'glob';
import path from 'path';

const resolveDependency = name => {
  return remote ? remote.require(name) : require(name);
};

const fs = resolveDependency('fs-extra');

const writeCoverageReport = coverage => {
  const outputFile = path.resolve(process.cwd(), 'coverage/coverage-main.json');
  fs.outputJsonSync(outputFile, coverage);
};

// Load all source files to get accurate coverage data
const loadSourceCode = () => {
  const intrumentedCode = path.join(__dirname, '..');

  glob(`${intrumentedCode}/**/*.js`, {
    sync: true,
  }).forEach(file => require(path.resolve(file)));
};

after(() => {
  loadSourceCode();
  writeCoverageReport((global).__coverage__);
});
