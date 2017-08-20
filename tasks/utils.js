const argv = require('minimist')(process.argv);

exports.beepSound = () => {
  process.stdout.write('\u0007');
};
