<template>
  <div class="add-list">
      <input 
        v-if="isAddList" 
        v-model="inputTitle" 
        @blur="restore"
        @keyup.enter="onSubmitTitle"
        type="text" 
        class="form-control" 
        placeholder="Input List Title..."
        ref="inputTitle">
      <a v-else @click.prevent="onAddList" href="">&plus; Add Another List..</a>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
            isAddList: false,
            inputTitle: ''
        }
    },
    computed: {
        ...mapGetters([
            'getBoardId',
            'getBoardLastList'
        ])
    },
    methods: {
        ...mapActions([
            'ADD_LIST'
        ]),
        onAddList() {
            this.isAddList = true;
            this.$nextTick(() =>  this.$refs.inputTitle.focus());
           
        },

        restore() {
            this.isAddList = false;
            this.inputTitle = '';
        },
        onSubmitTitle(){
           this.inputTitle = this.inputTitle.trim();
          
           if(!this.inputTitle) {
               alert("아무 입력이 없습니다.");
               
           }
           else {
               const title = this.inputTitle;
               const boardId = this.getBoardId;
               const lastList = this.getBoardLastList;
               const pos = lastList ? lastList.pos * 2 : 65535;  
               this.ADD_LIST({
                   title,
                   boardId,
                   pos
                });
                
           }
            
           this.restore();

        }
    }
}
</script>

<style scoped>
    .add-list {
        border-radius: 5px;
        background-color: rgba(0,0,0,.1);
        padding: 12px;
        transition: all 0.3s;
    }

    .add-list a {
        color: #ddd;
        text-decoration: none;
    }

    .add-list:hover,
    .add-list:focus {
        background-color: rgba(0,0,0,.3);
    }
</style>