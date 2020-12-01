import axios from '@/framework/http/axios'
const model = 'notification';
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

export function save(param, callback) {
  axios.post(`api/${model}/save`, param).then(data => {
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

export function batchSave(param, callback) {
  axios.post(`api/${model}/batchSave`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function batchCancel(param, callback) {
  axios.post(`api/${model}/batchCancel`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function batchRecover(param, callback) {
  axios.post(`api/${model}/batchRecover`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function batchReSend(param, callback) {
  axios.post(`api/${model}/batchReSend`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function recoverAll(param, callback) {
  axios.post(`api/${model}/recoverAll`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function reSendAll(param, callback) {
  axios.post(`api/${model}/reSendAll`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function cancelAll(param, callback) {
  axios.post(`api/${model}/cancelAll`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function findByNotificationPacketIdAndStatus(param, callback) {
  axios.post(`api/${model}/findByNotificationPacketIdAndStatus`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function countByNotificationPacketIdAndStatus(param, callback) {
  axios.post(`api/${model}/countByNotificationPacketIdAndStatus`, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
