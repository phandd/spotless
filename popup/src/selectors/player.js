import { createSelector } from 'reselect'

export const getPlayback = state => state.player.playback
export const getPlaybackItem = state => state.player.playback ? state.player.playback.item : null
export const getCoverArtUrl = createSelector(getPlaybackItem, playbackItem => {
  if (!playbackItem || !playbackItem.album || !playbackItem.album.images) {
    return null
  }

  let expectedImage

  for (let image of playbackItem.album.images) {
    if (image.height > 150 && image.height < 350) {
      expectedImage = image
      break;
    }
  }

  return expectedImage ? expectedImage.url : playbackItem.album.images[0].url
})
export const getTrackName = createSelector(getPlaybackItem, playbackItem => playbackItem ? playbackItem.name : null)
export const getArtists = createSelector(getPlaybackItem, playbackItem => {
  if (!playbackItem) {
    return null
  }

  return playbackItem.artists.reduce((artists, artist, currentIndex) => artists += currentIndex === 0 ? `${artist.name}` : `, ${artist.name}`, '')
})

export const getFavoriteStatus = createSelector(getPlaybackItem, playbackItem => playbackItem ? playbackItem["is_favorite"] : null)
export const getVolumePercentage = createSelector(getPlayback, playback => playback ? playback.device["volume_percent"] : null)

export const getPlayingTrackData = createSelector(getPlayback, getCoverArtUrl, getTrackName, getArtists, (playingTrack, coverArtUrl, trackName, artists) => {
  if (!playingTrack) {
    return null
  }

  return { coverArtUrl, trackName, artists }
})

export const getPlayerControlState = createSelector(getPlayback, getFavoriteStatus, getVolumePercentage, (playback, favorite, volume) => {
  if (!playback) {
    return null
  }

  return {
    repeat: playback['repeat_state'],
    shuffle: playback['shuffle_state'],
    playing: playback['is_playing'],
    favorite,
    volume
  }
})

export const getAvailableDevices = state => state.player.availableDevices
export const getDeviceAvailability = createSelector(getAvailableDevices, availableDevices => availableDevices ? availableDevices.length : true)
export const getLoadingStatus = state => state.player.loading
export const getTrackInfoLoadingStatus = state => state.player.track_info_loading
