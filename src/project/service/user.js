import axios from '@/framework/http/axios'
const model = 'user';
let getUrl = `api/${model}/get`;
let searchUrl = `api/${model}/search`;
let countUrl = `api/${model}/count`;
let deleteUrl = `api/${model}/delete`;
let batchDeleteUrl = `api/${model}/delete`;
let enableUrl = `api/${model}/enable`;
let disableUrl = `api/${model}/disable`;

export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function search(param, callback) {
  axios.post(searchUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function count(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function  del(param, callback) {
  axios.post(countUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function enable(param, callback) {
  axios.post(enableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function disable(param, callback) {
  axios.post(disableUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function findById(param, callback) {
  axios.post(`api/${model}/findById`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
