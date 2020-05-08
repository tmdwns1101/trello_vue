<template>
   
    <div>
        <div class="home-title">Personal Boards</div>
        <div class="board-list">
            <div class="board-item" v-for="(board, i) in boardList" :key="i" :data-bgcolor="board.bgColor" ref="boardItem">
                <router-link :to="`/b/${board.id}`">
                    <div class="board-item-title">{{board.title}}</div>
                </router-link>
            </div>
            <div class="board-item">
                <a class="new-board-btn" href="" @click.prevent="TOGGLE_IS_ADD_BOARD">
                    Create new board...
                </a>
            </div>
        </div>
        <AddBoard v-show="isAddBoard" ></AddBoard>
  </div>
   
</template>

<script>
import {board, setAuthInHeader} from "@/service";
import AddBoard from "./AddBoard.vue";
import {mapState, mapMutations, mapActions, createNamespacedHelpers} from "vuex";
export default {
   data() {
       return {
           loading: false,
           error: null,
           
          
       }
   },
   components: {AddBoard},
   computed: {
       ...mapState('board',[
       'isAddBoard',
       'boardList'
    ])
   },
   created() {
       const token = localStorage.getItem('token');
      
       this.fetchData();
       this.SET_THEME()
   },
   updated() {
       const boardItemByRef = this.$refs.boardItem;   // Vue 문법
       
       const boardItemElem = Array.from(document.querySelectorAll('.board-item'));  //javascript 문법
       boardItemElem.forEach(el => {
           el.style.backgroundColor = el.dataset.bgcolor;
       })
           
   },
   methods: {
       fetchData() {
           this.loading = true;
           this.FETCH_BOARDS().finally(()=>{
               this.loading = false;
           })
          
       },
       ...mapMutations('board',[
           'TOGGLE_IS_ADD_BOARD',
           
           
       ]),
       ...mapMutations([
           'SET_THEME'
       ]),
       ...mapActions('board',[
           'FETCH_BOARDS'
       ]),
     

   }
}
</script>

<style scoped>

.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>