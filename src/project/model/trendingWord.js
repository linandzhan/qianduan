import axios from '../../framework/http/axios';

const model = 'trendingWord';

const trendingWordService = {
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

  disable: (param) => {
    return axios.post(
      `api/${model}/disable`,
      param
    )
  }
};


export default trendingWordService;
