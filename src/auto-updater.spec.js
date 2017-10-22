import { initiateAutoUpdater } from './auto-updater';

const { app, dialog }  = require('electron');
const { autoUpdater } = require('electron-updater');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

describe('AutoUpdater', () => {
  it('should check for updates on app ready', done => {
    sinon.stub(autoUpdater, 'checkForUpdates');

    initiateAutoUpdater();

    app.emit('ready');

    setTimeout(() => {

      expect(autoUpdater.checkForUpdates).to.have.been.called;
      autoUpdater.checkForUpdates.restore();
      done();
    });
  });

  it('should show a dialog when an error occurs', () => {
    sinon.stub(dialog, 'showMessageBox');

    initiateAutoUpdater();
    autoUpdater.emit('error');

    expect(dialog.showMessageBox).to.have.been.called;
    dialog.showMessageBox.restore();
  });

  it('should show adialog when a new update has downloaded', () => {
    sinon.stub(dialog, 'showMessageBox');

    initiateAutoUpdater();
    autoUpdater.emit('update-downloaded', {});

    expect(dialog.showMessageBox).to.have.been.called;
    dialog.showMessageBox.restore();
  });
});
