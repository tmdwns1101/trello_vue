const getters = {
    getBoardId: (state) => {
        return state.board.id;
    },
    getBoardLastList: (state) => {
        const lists = state.board.lists;
        const lastElem = lists[lists.length - 1];
        return lastElem;
    }
}

export default getters;