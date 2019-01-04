ProtonMail Desktop [![license](https://img.shields.io/github/license/beatplus/protonmail.svg?style=flat-square)]()
======
![Protonmail Desktop on Linux](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/linux-screenshot.png)

ProtonMail Desktop is an **unofficial** app that emulates a native client for the ProtonMail e-mail service. Check out more about Protonmail in [their website](https://protonmail.com).

We are not affiliated with ProtonMail team. All copyrights belong to their respective owners.

### Features

#### Background behaviour
When closing the window, the app will continue running in the background. On OSX, app will be available in the dock and on WIN & Linux (depends on distro) in the tray. Right-click the dock/tray icon and choose Quit to completely quit the app. On OS X, click the dock icon to show the window. On Linux, right-click the tray icon and choose Toggle to toggle the window. On Windows, click the tray icon to toggle the window.

#### Native Notifications
Native notifications are working for all OS, you will get a notification when you receive a new email and window is not focused (i.e. app minimized).

![Notifications on Windows 10](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/win-notification.png)![Notifications on Elementary OS](https://raw.githubusercontent.com/protonmail-desktop/application/master/media/linux-notification.png)


## Dev and contributing

Built with [Electron](http://electron.atom.io). The main skeleton of the app is based on [szwacz/electron-boilerplate](https://github.com/szwacz/electron-boilerplate). I strongly recommend reading the readme in his repo. Basically, the ES6 javascript files and less stylesheets can be found at `./src/` while the static files and those that do not need processing are in `./app/`.

Any contribution or suggestion is accepted. Feel free to create any report for issues or app crashes. You can also use the report link provided in the application menu to create a crash report.
Pull requests are accepted.

##### Known bugs

* View headers inside an email does not work

### Testing
e2e testing runs with [Spectron](https://github.com/electron/spectron) inside a [Docker](https://docker.com) container.
- `$ docker build -t protonmail-desktop-e2e --rm .`
- `$ docker run protonmail-desktop-e2e`

All features should be covered within the tests.

## Running the App

### Executables

You can build your own executables from the latest source by running one of the commands below. More stable, older executables can be found [here](https://github.com/BeatPlus/Protonmail/releases).

### Compiling from source
The installer is provided by *electon-builder* and processed through gulp thanks to `electron-boilerplate`.

This will work on OS X, Linux, and Windows. You will need [Yarn](https://yarnpkg.com/en/docs/install) to run this app.
- Install required packages: `$ yarn install`
- Run: `$ yarn start`
- Build: `$ yarn build`
- Package in a distributable format: `$ yarn run dist`
- Generate package directory without distributable: `$ yarn run pack`

The building settings is in `./package.json` and additional configuration instructions can be found [here](https://github.com/electron-userland/electron-builder/wiki/Options). The building process will only create version for the current OS. For creating MacOS, Windows and Linux distributable you need to run the command from each OS.


License
----
**MIT** See License.md  
**Free Software, Hell Yeah!**
