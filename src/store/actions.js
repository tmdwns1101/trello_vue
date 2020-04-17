import * as api from "@/service";

const actions = {
    ADD_BOARD(context, {title}) {

        return api.board.create(title).then(data => data.item);
    },
    FETCH_BOARDS({commit}){
        return api.board.fetch().then(data => commit('SET_BOARDS',data.list))
    },
    FETCH_BOARD({commit}, id){
        console.log(id);
        return api.board.fetch(id).then(data => commit('SET_BOARD', data.item));
    },

    ADD_CARD({dispatch, state}, {title, listId, pos}) {
        console.log("title is ",title);
        
        return api.card.create({title, listId, pos})
            .then(()=> dispatch('FETCH_BOARD', state.board.id))
    },

    FETCH_CARD({commit}, id) {
        return api.card.fetch(id)
            .then(data => commit('SET_CARD', data.item))
    },

    UPDATE_CARD({dispatch, state}, {id, title, description, listId, pos}){
        return api.card.update(id, {title, description, listId, pos})
            .then(()=> dispatch('FETCH_BOARD', state.board.id))
    },

    LOGIN({commit}, {email, password}) {
        return api.auth.login(email, password)
            .then(({accessToken}) => commit('LOGIN',accessToken))
    }
};


export default actions;