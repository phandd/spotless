export default {
  checkTrackIsFavorited: id => `/me/tracks/contains?ids=${id}`,
  toggleTrackFavorite: id => `/me/tracks?ids=${id}`
}
