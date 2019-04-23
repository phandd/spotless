import { Store, applyMiddleware } from 'react-chrome-redux'
import thunkMiddleware from 'redux-thunk';
import { getPlaybackData, onVolumeMuteToggle } from './actions/player'

const store = new Store({
  portName: 'spotless'
})

const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

storeWithMiddleware.ready().then(() => {
  store.dispatch(getPlaybackData())
    .then(() => {
      let muting = false
      const observer = new MutationObserver(() => {
        const urlContainsAds = document.querySelector('.now-playing a').href.includes('ad');
        const artistIsSpotify = document.querySelector('.track-info__artists a').text === 'Spotify'
        const trackNameIsAds = document.querySelector('.track-info__name a').text === 'Advertisement'
        const titleContainsAds = document.title.includes('Advertisement')
    
        if (urlContainsAds || artistIsSpotify || trackNameIsAds || titleContainsAds) {
          store.dispatch(onVolumeMuteToggle())
          muting = true
        } else {
          if (muting) {
            store.dispatch(onVolumeMuteToggle())
            muting = false
          }
        }
      })

      const interval = setInterval(() => {
        const trackInfoElement = document.querySelector('.track-info')
    
        if (trackInfoElement) {
          clearInterval(interval)
          observer.observe(trackInfoElement, { childList: true, subtree: true })
        }
      }, 1000);
    })
})
