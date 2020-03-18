import Vue from "vue";
import Vuex from "vuex";
import { axios, errorHandler } from "../config/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    oneProduct: ""
  },
  mutations: {
    get(state, data) {
      state.products = data;
    },
    one(state, data) {
      state.oneProduct = data;
    }
  },
  actions: {
    async get({ commit }) {
      try {
        let { data } = await axios.get("/products", {
          headers: {
            access_token: localStorage.access_token
          }
        });
        commit("get", data);
      } catch (error) {
        errorHandler(error);
      }
    }
  },
  modules: {}
});
