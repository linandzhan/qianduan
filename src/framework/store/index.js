import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
Vue.use(Vuex);
const initPageState = () => {
  return {
    user: {
      id: 0,
      menus: [],
      nickname: "",
      permissions: [],
      realname: "",
      token: "",
      username: ""
    },
    prefix:'http://47.107.184.144/attachment/',
  };
};
const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initPageState(),
  mutations: {
    [types.SAVE_USER](state, pageState) {
      for (const prop in pageState) {
        state[prop] = pageState[prop];
      }
    }
  },
  actions: {
    [types.SAVE_USER_CACHE]() {
      let user = this.state.user;
      if (user.id !== "") {
        if (window.localStorage) {
          let ls = window.localStorage;
          let userCache = ls.getItem("userCache");
          if (userCache) {
            ls.removeItem("userCache");
          }
          ls.setItem("userCache", JSON.stringify(user));
        }
      }
    },
    [types.CLEAR_USER_CACHE]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        ls.removeItem("userCache");
      }
    },
    [types.GET_USER_CACHE]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem("userCache");
        let user = JSON.parse(userStr);
        this.commit(types.SAVE_USER, {
          user: user
        });
      }
    },
    [types.GET_USER_EXIST]() {
      if (window.localStorage) {
        let ls = window.localStorage;
        let userStr = ls.getItem("userCache");
        return !!userStr;
      }
    }
  }
});

export default store;
