export default {
  getSearchEndpoint: (keyword, limit, offset) => `/search?q=${keyword}&type=track%2Cplaylist%2Calbum&limit=${limit || 20}&offset=${offset || 0}`
}
