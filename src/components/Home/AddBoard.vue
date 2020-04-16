<template>
  <modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button" 
          @click.prevent="TOGGLE_IS_ADD_BOARD">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form" 
        @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="inputBoardTitle" ref="inputBoardTitle">
      </form>
    </div>
    <div slot="footer">
      <button class="btn" :class="{'btn-success': isValidInput}" type="submit" form="add-board-form" :disabled="!isValidInput">
        Create Board</button>
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/commons/Modal.vue'
import {mapMutations, mapActions} from 'vuex'
export default {
  components: { Modal },
  data () {
    return {
      inputBoardTitle: '',
      isValidInput: false
    }
  },
  watch: {
    inputBoardTitle(val) {
      this.isValidInput = !!val.trim().length;
    }
  },
  mounted () {
    this.$refs.inputBoardTitle.focus();
  },
  methods: {
      ...mapMutations([
        'TOGGLE_IS_ADD_BOARD'
      ]),
      ...mapActions([
        'ADD_BOARD',
        'FETCH_BOARDS'
      ]),
      close() {
         this.TOGGLE_IS_ADD_BOARD();
      },
      addBoard(){
          this.TOGGLE_IS_ADD_BOARD();
          this.ADD_BOARD({title: this.inputBoardTitle})
            .then(({id})=>this.$router.push(`/b/${id}`));
      }


  }
  
}
</script>