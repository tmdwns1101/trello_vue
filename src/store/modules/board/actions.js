import * as api from "@/service";

const actions = {
    ADD_BOARD(context, {title}) {

        return api.board.create(title).then(data => data.item);
    },
    FETCH_BOARDS({commit}){
        return api.board.fetch().then(data => commit('SET_BOARDS',data.list))
    },
    FETCH_BOARD({commit}, {id}){
        console.log(id);
        return api.board.fetch(id).then(data => commit('SET_BOARD', data.item));
    },
    DELETE_BOARD(ctx, {id}){
        return api.board.destroy(id)
    },
    UPDATE_BOARD({dispatch, state},{id, title, bgColor}){
        return api.board.update(id,{title, bgColor})
            .then(() => dispatch('FETCH_BOARD', {id: state.board.id}));
    }
}

export default actions;