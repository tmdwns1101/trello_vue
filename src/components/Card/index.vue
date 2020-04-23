<template>
  
    <modal class="modal-card ">
        <div slot="header" class="modal-card-header">
          <div class="modal-card-header-title">
            <input class="form-control" type="text" :value="card.title"  
              :readonly="!toggleTitle"
              @click="toggleTitle=true"
              @blur="onBlurTitle" 
              ref="inputTitle">
          </div>
          <a class="modal-close-btn" href="" @click.prevent="onClickClose">&times;</a>
        </div>
        <div slot="body">
          <h3>Description</h3>
          <textarea  class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..."
            :readonly="!toggleDesc"
            @click="toggleDesc=true"
            @blur="onBlurDesc"
            v-model="desc"
            ref="inputDesc"></textarea>
        </div>
        <div slot="footer"></div>
    </modal>
    
</template>

<script>
import Modal from '@/components/commons/Modal.vue';
import {mapState, mapActions} from 'vuex';
export default {
  components: {
    Modal
  },
  data(){
    return {
      toggleTitle: false,
      toggleDesc: false,
      desc: ""
    }
  },
  created() {
    this.fetchCard();
    
  },
  computed:{
    ...mapState({
      card: 'card'
    })
  },
  methods: {
    ...mapActions([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    fetchCard() {
      const {cid} = this.$route.params;
      console.log(cid);
      this.FETCH_CARD({id: cid})
        .then(()=> this.desc = this.card.description)
    },
    onClickClose() {
      const {bid} = this.$route.params;
      this.$router.push(`/b/${bid}`);
    },

    onBlurTitle() {
      const {inputTitle} = this.$refs;
      const title = inputTitle.value.trim();
      
      if(!title || this.card.title === title) return;
      this.UPDATE_CARD({id: this.card.id, title})
        .then(()=> {
          this.toggleTitle = false;
          this.fetchCard()
        });
    },

    onBlurDesc() {
      const description = this.desc.trim();
       if(!description || description === this.card.description) return;
      this.UPDATE_CARD({id: this.card.id, description})
        .then(()=> {
          this.toggleTitle = false;
          this.fetchCard()
        });
    }
    
  }

};
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;  
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>