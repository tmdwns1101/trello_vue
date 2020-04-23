import {setAuthInHeader} from "@/service";

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
    SET_CARD(state, card) {
        state.card = card;
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

    },

    SET_THEME(state, color) {
        state.bodyColor = color ? color : '#ffffff';
        state.navbarColor = color ? 'rgba(0,0,0,.15)' : '#026aa7'
    },

    TOGGLE_BOARD_SETTING(state, toggle) {
        state.toggleBoardSetting = toggle;
    }
};


export default mutations;