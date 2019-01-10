import { normalize } from 'normalizr'
import axios from 'axios'

const API_ROOT = 'https://api.spotify.com/v1'
const access_token = 'BQCriQmE31nW5kbJdHK1AdRvsoKHAEcRmnkkVbjMb-tzF5v4jIQ6bytA9DS2X68SW-XRCPdf8Bx6G6yVdD_k3BRVF_cvPPC71lidHyfe9cCTvXkvODntBHHnDc0LZFlVdvteToZCy_MeM8zk-xcnpJEcQodGf_5jpiqeazQu8QpqEla_EsRYze-02d_4feseVyi1Gj57JjP3F6nWqOFkC2TMJJRd3Da4H-QwtAKxmlr6OKbYhkszp2uCw_5ehpRXpgaSb8Efz89VhKv70o-fYAYlXYDSURYIXAVjwFpMYUjDtA'

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