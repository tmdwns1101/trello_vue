const getters = {
    isAuth(state) {
        return !!state.token;
    },

    getCurList: (state) => (listId) => {
        return state.board.lists.filter(l => l.id === listId)[0];
    },

    getBoardId: (state) => {
        return state.board.id;
    },
    getBoardLastList: (state) => {
        const lists = state.board.lists;
        const lastElem = lists[lists.length - 1];
        return lastElem;
    }
};


export default getters;