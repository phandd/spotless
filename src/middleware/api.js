import normalizr from 'normalizr'
import axios from 'axios'

export const CALL_API = 'CALL_API'

const API_ROOT = 'https://api.spotify.com/v1'
const access_token = 'BQCQXa1-sj7Gbk7bR7cwK8vCgE2tBVqehpzYE8uUG3IfpHqnXKqNNt75XqPMcs7AkdqAO8DyYzIXOaHFm_61Zp5f-2R0h4LnbMJZtg_h_2W3wN1OIsKE3I6K8sy46vRIPhTURDqrUS0rdqiBjDHUIJWc3QbFw13AAbWbAgyo4teTnEykbt11ZjtdKErs0Adcq-wrihjLHVnwCQVejHPsJtPcbsaLxFTO_kB3yrfzJ-RK5BDmjwqXATluxdQiNkudNoATpJ3j-C0HRCNXKVab5izzUHScFc3xcX6cNu43OmMFEQ';

const callApi = function (method, endpoint, headers, body, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

  return axios({
    method: 'get',
    url: fullUrl,
    data: body,
    headers: {...headers, authorization: `Bearer ${access_token}`}
  })
    .then(res => normalizr(res.data, schema))
}

export default store => next => action => {
  if (typeof action[CALL_API] === 'undefined') {
    return next(action)
  }

  const { endpoint, schema, method, headers, body, types } = action[CALL_API]

  if (typeof endpoint !== 'string') {
    throw new Error('Endpoint must be a string')
  }

  if (!schema) {
    throw new Error('Schema must be specified for API call')
  }

  if (!method) {
    throw new Error('Method is required for Api call')
  }

  if (!types) {
    throw new Error('Expecting array with 3 elements corresponding to requesting, success and failure')
  }

  const [requestType, successType, failureType ] = types

  next({ type: requestType })

  return callApi(method, endpoint, headers, body, schema)
    .then(response => next({
      response,
      type: successType
    }))
    .catch(err => next({
      error: err.message | 'Something bad happened',
      type: failureType
    }))
}