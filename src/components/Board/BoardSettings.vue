<template>
  <div class="board-menu" :class="{on: toggleBoardSetting}">
    <div class="board-menu-header">
      <div class="header-title">Menu</div>
      <a class="header-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <ul class="menu-list">
      <li><a href="" @click.prevent="onDeleteBoard">Delete Board</a></li>
      <li>Change Background Color
      
      </li>
      <div class="color-picker">

        <a href="" v-for="(color, index) in themes" 
        :key="index" 
        :data-value="color" 
        @click.prevent="onChangeTheme" 
        />
      </div>
    </ul>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';

export default {
    data() {
      return {
        themes: [
          'rgba(0,121,191)',
          'rgba(210,144,52)',
          'rgba(81,152,57)',
          'rgba(176,70,50)'
        ]
      }
    },
    mounted(){
      Array.from(this.$el.querySelectorAll('.color-picker a')).forEach(el => {
        el.style.backgroundColor=el.dataset.value
      })
    },
    computed: {
        ...mapState([
            'toggleBoardSetting',
            'board'
        ]),
        ...mapGetters([
            'getBoardId'
        ])
    },
    methods: {
        ...mapMutations([
            'TOGGLE_BOARD_SETTING',
            'SET_THEME'
        ]),
        ...mapActions([
            'DELETE_BOARD',
            'UPDATE_BOARD'
        ]),
        onClose() {
            this.TOGGLE_BOARD_SETTING(false);
        },

        /*2020.04.21 이슈 뒤로가기 누를시 삭제된 페이지 접근*/
        onDeleteBoard(){
            if(!window.confirm(`정말 ${this.board.title}를 삭제 하시겠습니까?`)) return;
            this.DELETE_BOARD({id: this.getBoardId})
                .then(()=> {
                    this.$router.push('/');
                })
        },

        onChangeTheme(e) {
            const target = e.target;
            const color = target.dataset.value;
            this.UPDATE_BOARD({
              id: this.getBoardId,
              title: this.board.title,
              bgColor: color
            }).then(() => {this.SET_THEME(color)});
        }
    }
}
</script>

<style scoped>
.board-menu {
  position: absolute;
  right: -300px;
  top: 0;
  height: 100%;
  background-color: #edeff0;
  width: 300px;
  transition: all .3s linear;
}
.on {
    right: 0;
}
.board-menu-header {
  height: 46px;
  padding: 0 6px 0 12px;
  border-bottom: #bbb solid 1px;
}
.header-title {
  font-size: 18px;
  text-align: center;
  line-height: 46px;
  font-weight:700;
}
.header-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  font-size: 24px;
  color: #999;
}
.menu-list {
  list-style: none;
  padding-left: 0px;
}
.menu-list li {
  height: 18px;
  line-height: 18px;
  padding: 10px;
  margin: 5px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: 700;
  color: #111;
  margin-bottom: 5px;
  cursor: pointer;
}
.menu-list li:hover,
.menu-list li:focus {
  background-color: rgba(0,0,0, .1);
}
.menu-list li a {
  text-decoration: none;
  color: inherit;
}
.color-picker {
  margin: 0 15px;
}
.color-picker a {
  display: inline-block;
  width: 49%;
  height: 100px;
  border-radius: 8px;
  margin-left: 1%;
}
.color-picker a:hover,
.color-picker a:focus {
  cursor: pointer; 
  background-color: rgba(0,0,0,.9); 
}
</style>