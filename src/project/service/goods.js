import axios from '@/framework/http/axios'

const model = 'goods';
let searchurl = `api/${model}/search`;
// let searchUrl = `api/${model}/findAllGoods`;
let searchGoodsUrl = `api/${model}/searchGoods`;
let searchPendingGoodsUrl = `api/${model}/searchPendingGoods`;
let countUrl = `api/${model}/count`;
let countGoodsUrl = `api/${model}/countGoods`;
let countPendingGoodsUrl = `api/${model}/countPendingGoods`;
let findGoodsByIdUrl = `api/${model}/findGoodsById`;
let getUrl = `api/${model}/get`;
let searchUrl = `api/${model}/searchGoods`;

let getCategoryUrl = `api/category/findAllByStatus`;//获取商品分类


let deleteUrl = `api/${model}/delete`;
let batchDeleteUrl = `api/${model}/delete`;
let enableUrl = `api/${model}/enable`;
let disableUrl = `api/${model}/disable`;
let saveStoreGoodsUrl = `api/${model}/saveStoreGoods`;
let saveUrl = `api/${model}/save`;
let saveGoodsUrl = `api/${model}/saveGoods`;
let updateUrl = `api/${model}/update`;
let findUrl=`api/${model}/findAll`;
let passUrl=`api/${model}/pass`;
let rejectUrl=`api/${model}/reject`;
let updateRejectReasonByIdUrl=`api/${model}/updateRejectReasonById`;
export function search(param, callback) {
  axios.post(searchurl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function searchGoods(param, callback) {
  axios.post(searchGoodsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function searchPendingGoods(param, callback) {
  axios.post(searchPendingGoodsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function countPendingGoods(param, callback) {
  axios.post(countPendingGoodsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function updateRejectReasonById(param, callback) {
  axios.post(updateRejectReasonByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function findGoodsById(param, callback) {
  axios.post(findGoodsByIdUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function getCategory(param, callback) {
  axios.post(getCategoryUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function get(param, callback) {
  axios.post(getUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function findGoods(param, callback) {
  axios.post(findUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function update(param, callback) {
  axios.post(updateUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function save(param, callback) {
  axios.post(saveUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function saveGoods(param, callback) {
  axios.post(saveGoodsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}

export function searchGood(param, callback) {
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
export function countGoods(param, callback) {
  axios.post(countGoodsUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function del(param, callback) {
  axios.post(deleteUrl, param).then(data => {
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
export function pass(param, callback) {
  axios.post(passUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
export function reject(param, callback) {
  axios.post(rejectUrl, param).then(data => {
    if (data !== undefined && data !== '' && data !== null) {
      // callback when data is exist
      callback(data)
    }
  })
}
