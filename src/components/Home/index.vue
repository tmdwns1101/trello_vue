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
                <a class="new-board-btn" href="" @click.prevent="addBoard">
                    Create new board...
                </a>
            </div>
        </div>
        <AddBoard v-show="isAddBoard" @close="handleClose" @submit="handleAddBoard"></AddBoard>
  </div>
   
</template>

<script>
import {board, setAuthInHeader} from "@/service";
import AddBoard from "./AddBoard.vue";
export default {
   data() {
       return {
           boardList: [],
           loading: false,
           error: null,
           isAddBoard: false
          
       }
   },
   components: {AddBoard},

   created() {
       const token = localStorage.getItem('token');
       setAuthInHeader(token);
       this.fetchData();
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
           board.fetch().then(res => {
               console.log(res);
               this.boardList = res.list;
           })
           .finally(()=>{
               this.loading = false;
           })
       },

       addBoard() {
           console.log("Add Board!");
           this.isAddBoard = true;
       },

       handleClose() {
          this.isAddBoard = false;
       },

       handleAddBoard(title) {
           console.log(title);
           board.create(title).then(data => {
                const {item} = data;
                console.log(data);
                this.boardList.push(item);
               })
               .catch(err => this.error = err);
       }

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