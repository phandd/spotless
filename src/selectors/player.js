import { createSelector } from 'reselect'

export const getPlayback = state => state.player.playback
export const getCoverArtUrl = createSelector(getPlayback, playback => playback ? playback.item.album.images[0].url : null)
export const getTrackName = createSelector(getPlayback, playback => playback? playback.item.name : null)
export const getArtists = createSelector(getPlayback, playback => {
  if (!playback) {
    return null
  }

  return playback.item.artists.reduce((artists, artist, currentIndex) => artists += currentIndex === 0 ? `${artist.name}` : `, ${artist.name}`, '')
})

export const getPlayingTrackData = createSelector(getPlayback, getCoverArtUrl, getTrackName, getArtists, (playingTrack, coverArtUrl, trackName, artists) => {
  if (!playingTrack) {
    return null
  }

  return { coverArtUrl, trackName, artists}
})

export const getPlayerControlState = createSelector(getPlayback, playback => {
  if (!playback) {
    return null
  }

  return {
    repeat: playback['repeat_state'],
    shuffle: playback['shuffle_state'],
    playing: playback['is_playing']
  }
})