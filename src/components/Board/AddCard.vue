<template>
<div class="add-card">
    <form @submit.prevent="onSubmit"> 
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn btn-success" type="submit" :disabled="invalidInput">Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')" >&times;</a>
    </form>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    props: ['listId'],
    data(){
        return {
            inputTitle: '',
           
        }
    },
    computed: {
        ...mapGetters([
            'getCurList'
        ]),
        invalidInput(){
            return !this.inputTitle.trim();
        }
    },
    mounted() {
        this.$refs.inputText.focus();
        this.setUpClickOutside();
        
    },
    methods:{
        ...mapActions([
            'ADD_CARD'
        ]),
        onSubmit() {
            if(this.invalidInput) return;
            const {inputTitle, listId} = this;
            const pos = this.newCardPos();
            this.ADD_CARD({title: inputTitle, listId, pos})
                .finally(() => this.inputTitle = '');
        },
        newCardPos() {
            const curList = this.getCurList(this.listId);
            if(!curList) return 65535;
            const {cards} = curList;
            if(!cards.length) return 65535;
            return cards[cards.length-1].pos * 2;
            
        },
        setUpClickOutside() {
            document.getElementById('app').addEventListener('click',this.closeClickListener)
            //document.querySelector('body').addEventListener('click', e => this.closeClickListener(el,e))
        },

        closeClickListener(e) {
            const el = this.$el;
            if(el.contains(e.target)) return;
          
            this.$emit('close');
        }
    },
    /*2020.04.17 이슈:  이벤트 해제 가 안됨.*/
    /*2020.04.17 이슈 해결 */
    
    beforeDestroy() {
        console.log("destory!")
        document.getElementById('app').removeEventListener('click',this.closeClickListener)
    }
    
}
</script>

<style scoped>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>