import { normalize } from 'normalizr'
import axios from 'axios'
import 'babel-polyfill'
import { getTokenFromCookie } from '../actions/auth'
import { renewSpotifyToken } from './auth';
import { AUTH as authActionTypes } from '../constants/actionTypes'


const API_ROOT = 'https://api.spotify.com/v1'
// const access_token = 'BQA95RZP55zb8UNBZ5fkJYx0-y5nI6yAn1eLLwSF1WcER2OKs_OXGMcsHwiWez9N0qVQL9v4h-2J4_bnOjv9zxHIue1_NSjEK04GJqMFXnBtRLvn2SjtfSLSVs8Mg3pbKGAEijNfpRhH1yknpuiWWSZ49okuQuuhNCFy_fPyMnPe-uphbJ8PajDAfD5PSbA_OkF8mxPTM5dIdGUgeCjoe6MbwMQAQo-n2Tom46g3bvq2wFaAB0eY-kyMsvtMxKDihZ26-k8VhGTnCD7PglA2SmWyeHZyF4pZxyj-bUfKDLagxQ'

let access_token
let authenticated = true; // This value representing the authenticate status

// API call thunk, this is a function that accepts
// an options parameter as the options to call API,
// and the data parameter which is the object to be sent
// along with the dispatched actions (request, success, failure)
// during the API call.

export const callApiThunk = (options, data) => async (dispatch, getState) => {
  // If there's no token available in state, try
  // to get token from https://open.spotify.com cookie,
  // If cannot get token from cookie (wp_access_token not exist),
  // renew the token by send GET request to https://open.spotify.com,
  // the request when sent will update new cookie for 
  // https://open.spotify.com because the response include
  // Set-Cookie header. After the cookie is updated, try
  // to get token from cookie again
  if (!getState().auth.token) {
    try {
      await dispatch(getTokenFromCookie())
    } catch {
      await renewSpotifyToken()
      await dispatch(getTokenFromCookie())
    }
  }

  access_token = getState().auth.token

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
    .then(response => {
      authenticated = true

      return dispatch({
        ...data,
        response,
        type: successType
      })
    })
    .catch(async err => {
      // If the request fails for the first time (authenticated = true)
      // check if the token is invalid/expired by send the request to
      // get user info api (the reason we have to send this request is
      // because the reponse from Spotify APIs not always returns 401
      // if the token expired/invalid, so we need to call this api to 
      // make sure the reason the request fails is because of the token
      // becomes invalid/expired.
      //
      // If the request to user api is success, then the request
      // fails for some other reasons, not the token.
      // If it reponses 401, the token is invalid/expired. We need to get
      // new token by:
      //    1. Renew the cookie by send request to https://open.spotify.com
      //    2. Get new token returned from new cookie achived by step 1
      // and also set the authenticated flag to false to determine that
      // if the second call still fails, the user is not logged in.

      // After those two steps, call the failed api again by
      // dispatch(callApiThunk(options, data)) with new token.
      // If the request fails again, this time authenticated === false,
      // then the new token is also invalid, means the user is not
      // logged in on https://open.spotify.com.

      if (!authenticated) {
        // User is not logged in
        dispatch({
          type: authActionTypes.LOG_OUT
        })

        return Promise.reject('User is not logged in')
      }

      try {
        await getUserInfo(access_token)

        dispatch({
          ...data,
          error: err.message || 'Something bad happened',
          type: failureType
        })

        return Promise.reject(err.message)
      } catch(err) {
        if (err.response.data.error.status === 401) {
          await renewSpotifyToken()
          await dispatch(getTokenFromCookie())
          authenticated = false

          return dispatch(callApiThunk(options, data))
        }
        return Promise.reject(err.message)
      }
    })
}

function getUserInfo(token) {
  return axios({
    method: 'GET',
    url: `${API_ROOT}/me`,
    headers: {
      authorization: `Bearer ${token}`
    }
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