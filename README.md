# ProtonMail Desktop

ProtonMail Desktop is an unofficial app to emulate a native client for the amazing ProtonMail e-mail service.

I am not affiliated with ProtonMail team. All copyrights belong to their respectives owners.

This is an experiment from a PHP coder, code may be bad and ugly. Most part of the core was modified from [sindresorhus/caprine](https://github.com/sindresorhus/caprine) repo.

### Features

#### Backgrond behaviour
When closing the window, the app will continue running in the background, in the dock on OS X and the tray on Linux/Windows. Right-click the dock/tray icon and choose Quit to completely quit the app. On OS X, click the dock icon to show the window. On Linux, right-click the tray icon and choose Toggle to toggle the window. On Windows, click the tray icon to toggle the window.

#### Dark mode
You can toggle dark mode in the application menu or with <kbd>Cmd</kbd> <kbd>D</kbd> / <kbd>Ctrl</kbd> <kbd>D</kbd>.

#### Native Notifications
Native notifications are working for all OS, you will receive a notification when you get a new email and window is not focused (i.e. app minimized).


### Version

0.1.0

## Dev and contributing

Built with [Electron](http://electron.atom.io). If you find something wrong with the app  (theming issues, app crashes) please report them as an issue or use the report link in the application.
If you think you can improve the code or add any new feature feel free to nake a pull request.


##### Known bugs
There are some bugs I am aware of but could not find a fix for them. These include notifications not working when not in the inbox andPantheon DE tray is not working properly for the moment.

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build:osx`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`
- Build all: `$ brew install wine` and `$ npm run build` *(OS X only)*


License
----

**MIT** See License.md  
**Free Software, Hell Yeah!**
