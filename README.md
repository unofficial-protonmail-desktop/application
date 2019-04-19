ProtonMail Desktop [![license](https://img.shields.io/github/license/beatplus/protonmail.svg?style=flat-square)]() <a href="https://snyk.io/test/github/protonmail-desktop/application"><img src="https://snyk.io/test/github/protonmail-desktop/application/badge.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/protonmail-desktop/application" style="max-width:100%;"></a> [![codecov](https://codecov.io/gh/protonmail-desktop/application/branch/master/graph/badge.svg)](https://codecov.io/gh/protonmail-desktop/application)
======
![Protonmail Desktop on Linux](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/linux-screenshot.png)

[![Download from Snap Store](https://user-images.githubusercontent.com/45159366/54588580-a9b19400-49e0-11e9-86aa-7190fe124925.png)](https://snapcraft.io/protonmail-desktop-unofficial)

ProtonMail Desktop is an **unofficial** app that emulates a native client for the ProtonMail e-mail service. Check out more about Protonmail in [their website](https://protonmail.com).

We are not affiliated with ProtonMail team. All copyrights belong to their respective owners.

### Features

#### Background behaviour
When closing the window, the app will continue running in the background. On OSX, app will be available in the dock and on WIN & Linux (depends on distro) in the tray. Right-click the dock/tray icon and choose Quit to completely quit the app. On OS X, click the dock icon to show the window. On Linux, right-click the tray icon and choose Toggle to toggle the window. On Windows, click the tray icon to toggle the window.

#### Native Notifications
Native notifications are working for all OS, you will get a notification when you receive a new email and window is not focused (i.e. app minimized).

![Notifications on Windows 10](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/win-notification.png)![Notifications on Elementary OS](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/linux-notification.png)

## Dev and contributing

Built with [Electron](http://electron.atom.io) and React. Write unit tests for new functionality and add e2e test when appropriate.

Dev and compile works on OS X, Linux, and Windows. You will need [Yarn](https://yarnpkg.com/en/docs/install) to run this app.

Any contribution or suggestion is accepted. Feel free to create any report for issues or app crashes. You can also use the report link provided in the application menu to create a crash report.
Pull requests are accepted.

### Developing
1. `yarn`
1. `yarn start`

## Running the App

### Executables

You can build your own executables from the latest source by running one of the commands below. More stable, older executables can be found [here](https://github.com/protonmail-desktop/Protonmail/releases).

### Compiling from source
The installer is provided by *electon-builder* and processed through webpack.

1. `$ yarn`
1. `$ yarn build:prod`
1. `$ yarn run dist` to package in a distributable format.
1. `$ yarn run pack` to generate package directory without distributable.

The building settings is in `./package.json` and additional configuration instructions can be found [here](https://github.com/electron-userland/electron-builder/wiki/Options). The building process will only create version for the current OS. For creating MacOS, Windows and Linux distributable you need to run the command from each OS.


License
----
**MIT** See License.md  
**Free Software, Hell Yeah!**
