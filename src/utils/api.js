import { normalize } from 'normalizr'
import axios from 'axios'

const API_ROOT = 'https://api.spotify.com/v1'
const access_token = 'BQAx_HfcmLijmQzDHvAJ1JJn6HYm5tX8x83rq7ZmmVjms6CHGtOHWOcN5QO4dAYldW9F6jHza9ecgYbHFnNs5lFzJXPZWHqZIUqS6VAquVq3-_zSmv8exuINtcFlfMi7l-q6UzPQjO3NEa9hf0wbxUaW5zIonpR0D5oSYaKaruGwXUL3mM0tUn2gG7KA6tPCUaM85vIuhyhNj34ein8JmE6ZO0agJzFXQJ3BOJbIh7xfRhfGcwShhrXL5hdIdVb6NuDcq81U2ZnGhvq_b_wwia5cI6nYC7H3V20ZDxvVBcQc0g'

// API call thunk, this is a function that accepts
// an options parameter as the options to call API,
// and the data parameter which is the object to be sent
// along with the dispatched actions (request, success, failure)
// during the API call.

export const callApiThunk = (options, data) => dispatch => {
  const { endpoint, schema, method, headers, body, types, responseSelector } = options

  if (typeof endpoint !== 'string') {
    throw new Error('Endpoint must be a string')
  }

  if (!method) {
    throw new Error('Method is required for Api call')
  }

  if (!(Array.isArray(types) && types.length === 3)) {
    throw new Error('Expecting array with 3 elements corresponding to requesting, success and failure')
  }

  const [ requestType, successType, failureType ] = types

  dispatch({ ...data, type: requestType })

  return callApi(method, endpoint, headers, body, schema, responseSelector)
    .then(response => dispatch({
      ...data,
      response,
      type: successType
    }))
    .catch(err => {
      dispatch({
        ...data,
        error: err.message || 'Something bad happened',
        type: failureType
      })

      return Promise.reject(err.message)
    })
}

function callApi(method, endpoint, headers, body, schema, responseSelector) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return axios({
    method,
    url: fullUrl,
    data: body,
    headers: {...headers, authorization: `Bearer ${access_token}`}
  })
    .then(res => schema ? normalize(res.data[responseSelector] || res.data, schema) : (res.data[responseSelector] || res.data))
    .catch(res => Promise.reject(res.response.data.error))
}