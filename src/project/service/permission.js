import axios from '@/framework/http/axios'
const model = 'permission';
let searchUrl = `api/${model}/search`;
let countUrl = `api/${model}/count`;
let updateUrl = `api/${model}/update`;
let findPermissionList = `api/${model}/findByModule`;

export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
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
export function findPermissionList(param, callback) {
  axios.post(findPermissionList, param).then(data => {
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
