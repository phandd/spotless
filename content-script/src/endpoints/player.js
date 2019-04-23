export default {
  getPlaybackDataEndpoint: () => '/me/player',
  setVolumeEndpoint: percent => `/me/player/volume?volume_percent=${percent}`
}