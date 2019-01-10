export default {
  getAvailableDevicesEndpoint: () => '/me/player/devices',
  transferPlaybackEndpoint: () => '/me/player',
  getPlaybackDataEndpoint: () => '/me/player',
  startPlaybackEndpoint: () => '/me/player/play',
  pausePlaybackEndpoint: () => '/me/player/pause',
  toggleShuffleEndpoint: (state) => `/me/player/shuffle?state=${state}`,
  setRepeatMode: (state) => `/me/player/repeat?state=${state}`,
  skipNext: () => '/me/player/next',
  skipPrevious: () => '/me/player/previous',
  play: () => '/me/player/play',
  pause: () => '/me/player/pause',
  setVolumeEndpoint: percent => `/me/player/volume?volume_percent=${percent}`
}