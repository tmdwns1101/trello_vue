import Vuex from 'vuex';
import Vue from 'vue';
import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import board from "./modules/board";


Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        board
    },
    state,
    mutations,
    actions,
    getters
    
});

const {token} = localStorage;

store.commit('LOGIN',token);

export default store;