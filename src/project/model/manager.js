import axios from '../../framework/http/axios';

const model = 'manager';

const managerService = {
  /**
   * @Description: 查询
   * @author Zd Lin
   * @date 2020/3/18/018
   */
  search: (param) => {
    return axios.post(
      `api/${model}/search`,
      param
    )
  },

  count: (param) => {
    return axios.post(
      `api/${model}/count`,
      param
    )
  },

  get: (param) => {
    return axios.post(
      `api/${model}/get`,
      param
    )
  },

  save: (param) => {
    return axios.post(
      `api/${model}/save`,
      param
    )
  },

  update: (param) => {
    return axios.post(
      `api/${model}/update`,
      param
    )
  },

  delete: (param) => {
    return axios.post(
      `api/${model}/delete`,
      param
    )
  },

  enable: (param) => {
    return axios.post(
      `api/${model}/enable`,
      param
    )
  },

  addRole: (param) => {
    return axios.post(
      `api/${model}/addRole`,
      param
    )
  },

  removeRole: (param) => {
    return axios.post(
      `api/${model}/removeRole`,
      param
    )
  },

  updatePassword: (param) => {
    return axios.post(
      `api/${model}/updatePassword`,
      param
    )
  },
};


export default managerService;
