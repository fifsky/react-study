import axios from 'axios'
import { Err } from './error'

export const getAccessToken = function () {
  return localStorage.getItem('access_token')
}

export const request = (option) => {
  return new Promise((resolve, reject) => {
    axios(option).then(v => {
      if (v.data.code === 200) {
        resolve(v.data.data)
      } else {
        reject(Err.instance(v.data))
      }
    }).catch(e => {
      reject(Err.instance(e))
    })
  })
}

export const createApi = (url, data) => {
  let headers = {
    'Access-Token': getAccessToken(),
  }

  let param = {
    url,
    data,
    method: 'post',
    headers
  }

  return request(param)
}