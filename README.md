# spotless
Spotless is a Chrome extension allows you to control your Spotify player, mute annoying ads, search and play music everywhere.

 ![spotless_demo](https://user-images.githubusercontent.com/20087095/56844564-75cd6680-68dc-11e9-8cbc-e8755a6a3bab.gif)

## Installation
The extension is available on [Chrome Store](https://chrome.google.com/webstore/detail/spotless/allccgoelledmdfenijoodhcfjndddjh)
## Getting started
You can clone and build the extension yourself:

```sh
git clone https://github.com/phandd/spotless
```
navigate to project directory and install dependencies:
```
npm install
```
and build the extension:
```
npm run build
```

The built version will be placed at `/dist`. All you need to do is add the extension manually to your Chrome browser:

![load_extension](https://user-images.githubusercontent.com/20087095/56460498-e00e7480-63cd-11e9-9ed1-3b66381d8039.gif)

then you're good to go!

## Usage
 - This extension only compatible with Spotify web app and desktop app. It also requires you to login to Spotify on web app to be able to use your cookies.

 - You need at least one available device running Spotify (either web app player or desktop app player) to use the extension, which makes sense, you wouldn't be able to listen to music if you don't have any device opening Spotify, the extensions cannot play music itself, it's a controller.

- The Ads mute feature only work if you have a tab opening https://open.spotify.com on your Chrome browser. So the extension can detect whether an ads or a song is playing.

- You can still play music on your Spotify desktop client and mute the ads, as long as you open https://open.spotify.com on a tab of your browser for the extension to work.

 - Controlling mobile device is a feature for Spotify Premium users, this extensions will not work with mobile device.
 
## Tech stack
 - **ReactJs, ReduxJs, normalizr, reselect** for Web app
 - **Webpack** for build cli
 - **Babel** for ES6 syntax
 - **react-chrome-redux** for running a Reactjs app as an extension
 
 and more, please check `package.json`.

For ReactJs Web app source code only, please checkout [src](https://github.com/phandd/spotless/tree/src) branch.
