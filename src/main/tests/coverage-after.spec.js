import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';

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
  if (process.env.NODE_ENV === 'test_main') {
    loadSourceCode();
    writeCoverageReport((global).__coverage__);
  }
});
