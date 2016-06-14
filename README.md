ProtonMail Desktop
======
![alt text](https://raw.githubusercontent.com/BeatPlus/Protonmail/master/media/windows-screenshot.png "Protonmail Desktop on Windows 10")

ProtonMail Desktop is an **unofficial** app that emulates a native client for the ProtonMail e-mail service. Check out more about Protonmail in [their website](https://protonmail.com).

We are not affiliated with ProtonMail team. All copyrights belong to their respective owners.

This is an experiment from a main PHP coder, code may be bad and ugly. Most part of the initial core was modified from [sindresorhus/caprine](https://github.com/sindresorhus/caprine) repo.

### Features

#### Background behaviour
When closing the window, the app will continue running in the background. On OSX, app will be available in the dock and on WIN & Linux (depends on distro) in the tray. Right-click the dock/tray icon and choose Quit to completely quit the app. On OS X, click the dock icon to show the window. On Linux, right-click the tray icon and choose Toggle to toggle the window. On Windows, click the tray icon to toggle the window.

#### Dark mode
You can toggle dark mode in the application menu or with <kbd>Cmd</kbd> <kbd>D</kbd> / <kbd>Ctrl</kbd> <kbd>D</kbd>.

#### Native Notifications
Native notifications are working for all OS, you will get a notification when you receive a new email and window is not focused (i.e. app minimized).

![alt text](https://raw.githubusercontent.com/BeatPlus/Protonmail/master/media/win-notification.png "Notifications on Windows 10")

### Version

Still in beta. 0.1.1

## Dev and contributing

Built with [Electron](http://electron.atom.io). There are two package.json, the *./package.json* contains the tools for creating installers and packages and the *app/package.json* the real dependencies. The code used for the final application is in /app.

Any contribution or suggestion is accepted. Feel free to create any report for issues or app crashes. You can also use the report link provided in the application menu to create a crash report.
Pull requests are accepted.

##### Known bugs

* Pantheon Tray not working
* Config plugin not working correctly

## Running the App

### Executables

You can find build lates buggier executables using commands below. More stable, older executables can be found [here](https://github.com/BeatPlus/Protonmail/releases).

### Compiling from source
The installer is provided by *electon-builder*.

This will work on OS X, Linux, and Windows. You will need [NodeJS](https://nodejs.org) to run this app.
- Install required packages: `$ npm install`
- Run: `$ npm start`
- Build Linux 32 bit: `$ npm run dist:linux32`
- Build Linux 64 bit: `$ npm run dist:linux64`
- Build Windows 32 bit: `$ npm run dist:win64`
- Build Windows 64 bit: `$ npm run dist:win32`
- Build OS X: `$ npm run dist:osx`
- Build all: `$ npm run dist`


License
----
**MIT** See License.md  
**Free Software, Hell Yeah!**
