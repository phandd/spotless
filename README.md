# spotless
Spotless is a Chrome extension allows you to control your Spotify player, search and play music by calling Spotify API.

 ![spotless_demo](https://user-images.githubusercontent.com/20087095/56460697-eeaa5b00-63d0-11e9-9725-1f50075a0a3b.gif)

## Installation
The extension is available on [Chrome Store](https://chrome.google.com/webstore/detail/spotless/allccgoelledmdfenijoodhcfjndddjh)

## Getting started
You can download the packed `.crx` version to install to your Chrome browser or build one yourself.

### To use packed version:
 - Download `.crx` from [release](https://github.com/phandd/spotless/releases), open the `Extension` menu from your Chrome browser and drag `spotless.crx` to install the extension.
### To build the extension:
```sh
git clone https://github.com/phandd/spotless
```
navigate to project directory and install dependencies:
```
npm install
```
build the extension:
```
npm run build
```

The built version will be placed at `/dist`. All you need to do is add the extension manually to your Chrome browser:

![load_extension](https://user-images.githubusercontent.com/20087095/56460498-e00e7480-63cd-11e9-9ed1-3b66381d8039.gif)

then you're good to go!

## Usage
 - This extension only compatible with Spotify web app and desktop app. It also requires you to login to Spotify on web app to be able to use your cookies.
 - You need at least one available device running Spotify (either web app player or desktop app player) to use the extension, which makes sense, you wouldn't be able to listen to music if you don't have any device opening Spotify, the extensions cannot play music itself, it's a controller.
 - Controlling mobile device is a feature for Spotify Premium users, this extensions will not work with mobile device unless you're Spotify Premium user.
 
## Tech stack
 - **ReactJs, ReduxJs, normalizr, reselect** for Web app
 - **Webpack** for build cli
 - **Babel** for ES6 syntax
 - **react-chrome-redux** for running a Reactjs app as an extension
 
 and more, please check `package.json`.

For ReactJs Web app source code only, please checkout [src](https://github.com/phandd/spotless/tree/src) branch.
