const mutations = {
    TOGGLE_IS_ADD_BOARD (state) {
       
        state.isAddBoard = !state.isAddBoard;
    },
    SET_BOARDS (state, boards) {
        
        state.boardList = boards;
    },
    SET_BOARD(state, board){
        
        state.board = board;
    },
    TOGGLE_BOARD_SETTING(state, toggle) {
        state.toggleBoardSetting = toggle;
    }
}

export default mutations;