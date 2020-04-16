import {setAuthInHeader} from "@/service";

const mutations = {
    TOGGLE_IS_ADD_BOARD (state) {
        console.log("mutation!");
        state.isAddBoard = !state.isAddBoard;
    },
    SET_BOARDS (state, boards) {
        console.log(boards);
        state.boardList = boards;
    },
    SET_BOARD(state, board){
        console.log(board);
        state.board = board;
    },
    LOGIN(state, token) {
        if(!token) return;
        state.token = token;
        localStorage.setItem('token',token);
        setAuthInHeader(token);

    },
    LOGOUT(state){
        state.token = null;
        delete localStorage.token;
        setAuthInHeader(null);

    }
};


export default mutations;