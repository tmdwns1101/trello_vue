const getters = {
    isAuth(state) {
        return !!state.token;
    },

    getCurList: (state) => (listId) => {
        return state.board.lists.filter(l => l.id === listId)[0];
    },

    getBoardId: (state) => {
        return state.board.id;
    }
};


export default getters;