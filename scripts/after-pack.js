// https://github.com/patrikx3/redis-ui/blob/b772176fc71f5cccbe1dbe31c8f7bd0fdb75f52e/src/build/after-pack.js

const fs = require('fs-extra');
const pkg = require('../package');
const { spawn } = require('child_process');
const { chdir } = require('process');

const exec = async function exec(cmd, args = []) {
  const child = spawn(cmd, args, { shell: true });
  redirectOutputFor(child);
  await waitFor(child);
};

const redirectOutputFor = (child) => {
  const printStdout = (data) => {
    process.stdout.write(data.toString());
  };
  const printStderr = (data) => {
    process.stderr.write(data.toString());
  };
  child.stdout.on('data', printStdout);
  child.stderr.on('data', printStderr);

  child.once('close', () => {
    child.stdout.off('data', printStdout);
    child.stderr.off('data', printStderr);
  });
};

const waitFor = async function(child) {
  return new Promise((resolve) => {
    child.once('close', () => resolve());
  });
};

module.exports = async function(context) {
  // eslint-disable-next-line no-console
  console.warn('after build; disable sandbox');
  const isLinux = context.targets.find(target => target.name === 'appImage' || target.name === 'snap');
  if (!isLinux) {
    return;
  }
  const originalDir = process.cwd();
  const dirname = context.appOutDir;
  chdir(dirname);

  await exec('mv', [pkg.name, pkg.name + '.bin']);
  const wrapperScript = `#!/bin/bash
    "\${BASH_SOURCE%/*}"/${pkg.name}.bin "$@" --no-sandbox
  `;
  fs.writeFileSync(pkg.name, wrapperScript);
  await exec('chmod', ['+x', pkg.name]);

  chdir(originalDir);
};
