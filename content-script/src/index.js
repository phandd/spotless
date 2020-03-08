import { Store, applyMiddleware } from 'react-chrome-redux'
import thunkMiddleware from 'redux-thunk';
import { getPlaybackData, onVolumeMuteToggle } from './actions/player'
const store = new Store({
  portName: 'spotless'
})

const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(store, ...middleware);

storeWithMiddleware.ready().then(() => {
  let muting = false
  console.log('--------content script ran------------')
  const observer = new MutationObserver(() => {
    // const urlContainsAds = document.querySelector('.now-playing a').href.includes('ad');
    // const artistIsSpotify = document.querySelector('.track-info__artists a').text === 'Spotify'
    // const trackNameIsAds = document.querySelector('.track-info__name a').text === 'Advertisement'
    const titleContainsAds = document.title.includes('Advertisement') || document.title.includes('Spotify')
    
    if (titleContainsAds) {
      if (!muting) {
        store.dispatch(getPlaybackData())
        .then(() => {
          store.dispatch(onVolumeMuteToggle())

          muting = true
        }) 
      }
    } else {
      if (muting) {
        store.dispatch(onVolumeMuteToggle())
        muting = false
      }
    }
  })

  const interval = setInterval(() => {
    const trackInfoElement = document.querySelector('.now-playing')

    if (trackInfoElement) {
      clearInterval(interval)
      observer.observe(trackInfoElement, { childList: true, subtree: true, attributes: true })
    }
  }, 1000);
})
