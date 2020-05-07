<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <input class="form-control" v-if="isEditTitle" type="text" 
          v-model="inputTitle" 
          ref="inputTitle"
          @blur="onSubmitEditTitle"
          @keyup.enter="onSubmitEditTitle"
          >
          <span v-else class="board-title" @click.prevent="onEditTitle">{{board.title}}</span>
          <a href="" class="board-header-btn show-menu" @click.prevent="onShowSettings">
            ...Show Menu
          </a>
        </div>
        
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.id" :data-list-id="list.id">
                <List :data="list" />
            </div>
            <div class="list-wrapper">
                <AddList/>
            </div>
          </div>
        </div>
      </div>
      <BoardSettings></BoardSettings>
    </div>
   
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import List from './List';
import dragula from 'dragula';
import 'dragula/dist/dragula.css';
import dragger from '@/utils/dragger';
import BoardSettings from "./BoardSettings";
import AddList from "./AddList"
export default {
  components: {
    List,
    BoardSettings,
    AddList
  },
  data() {
    return {
      bid: 0,
      loading: false,
      cDragger: null,
      lDragger: null,
      isEditTitle: false,
      inputTitle: ""
    };
  },
  computed:{
    ...mapState({
      board: 'board',
      toggleBoardSetting: 'toggleBoardSetting'
    })
  },
  created() {
    const { bid } = this.$route.params;
    this.bid = bid;
    
  
    this.fetchData().then(() =>{
       this.inputTitle = this.board.title;
       this.SET_THEME(this.board.bgColor)
    });
    this.TOGGLE_BOARD_SETTING(false);
  },
  updated(){
    this.setCardDragable();
    this.setListDragable();

  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD',
      'UPDATE_BOARD',
      'UPDATE_LIST'
      
    ]),
    ...mapMutations([
      'SET_THEME',
      'TOGGLE_BOARD_SETTING'
    ]),
    fetchData() {
      this.loading = true;
      return this.FETCH_BOARD({id: this.bid})
        .then(()=> this.loading = false);
     
    },
    setCardDragable(){
      if(this.cDragger) this.cDragger.destroy();

      const cardList = Array.from(this.$el.querySelectorAll('.card-list'));
      this.cDragger = dragger.init(cardList);

      this.cDragger.on('drop', (el, wrapper, target, sibling) => {
        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        };


        const {prev, next} = dragger.sibling({
          el,
          candidates: Array.from(wrapper.querySelectorAll('.card-item')),
          type: 'card'
        });

        if(!prev && next) targetCard.pos = next.pos / 2;
        else if(prev && !next) targetCard.pos = prev.pos * 2;
        else if(prev && next) targetCard.pos = (prev.pos + next.pos) / 2;
        else console.log("error")
        console.log(targetCard)

        this.UPDATE_CARD(targetCard);
      })
    },
    setListDragable() {
      if(this.lDragger) this.lDragger.destroy();

      const options = {
        invalid: (el, handle) => (!/^list/.test(handle.className))
      }

      const listContainer = Array.from(this.$el.querySelectorAll('.list-section'));
      this.lDragger = dragger.init(listContainer,options);

      this.lDragger.on('drop', (el, wrapper, target, sibling) => {
        const targetList = {
          id: el.dataset.listId * 1,
          pos: 65535
        };


        const {prev, next} = dragger.sibling({
          el,
          candidates: Array.from(wrapper.querySelectorAll('.list')),
          type: 'list'
        });

        if(!prev && next) targetList.pos = next.pos / 2;
        else if(prev && !next) targetList.pos = prev.pos * 2;
        else if(prev && next) targetList.pos = (prev.pos + next.pos) / 2;
        else console.log("error")
      

        this.UPDATE_LIST(targetList);
      })
    },

    onShowSettings() {
      this.TOGGLE_BOARD_SETTING(true);
    },
    onEditTitle() {
      this.isEditTitle = true;
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      })
    },
    onSubmitEditTitle() {
      this.isEditTitle = false
      const title = this.inputTitle.trim();
      if(!title) return;
      if (title === this.board.title) return;

      const id = this.board.id;

      this.UPDATE_BOARD({id, title});
        
    }
  }
};
</script>

<style >
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: hidden;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  
} 
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>


