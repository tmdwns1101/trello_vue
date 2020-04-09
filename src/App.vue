<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
  
</template>

<script>
import NavBar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    'NavBar': NavBar 
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>

</style>
