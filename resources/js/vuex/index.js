import Vue from "vue";
import Vuex from "vuex";
import { remove, set } from "lodash";

import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";
import modules from "./modules";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters:getters,
    actions: actions,
    modules: modules,
});

export default store;
