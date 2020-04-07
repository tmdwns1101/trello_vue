<template>
   
    <div>
        This is Home Page
         <ul>
            <li v-for="(item,index) in itemList" :key="index">
                <router-link :to="{path : `b/${item.item}`}">{{item.item}}</router-link>
          
            </li> 
        </ul>
    </div>
   
</template>

<script>


export default {
   data() {
       return {
           itemList: [
               {'item': 1},
               {'item': 2},
               {'item': 3},
           ]
       }
   }
}
</script>

<style>

</style>