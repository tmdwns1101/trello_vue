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
import {mapActions} from 'vuex'
export default {
    props: ['listId'],
    data(){
        return {
            inputTitle: '',
           
        }
    },
    computed: {
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
         
            this.ADD_CARD({title: inputTitle, listId})
                .finally(() => this.inputTitle = '');
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