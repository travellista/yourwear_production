<template>
  <div class="home">
    <thenav />
    <!-- <newcollection/> -->
    <router-view/>

  </div>
</template>

<script>
// import newcollection from '../components/Normaluser/Home/newcollection.vue'
import thenav from '../components/Shared/NavBar/menubar.vue'


import {mapGetters} from 'vuex'
export default {
  
  name: 'Home',
  components: {
// newcollection,
thenav,

  },
  computed:{
   ...mapGetters(['getuser'])
  }
  ,
  // created(){
  //   if(localStorage.getItem('currentuser'))
  //   {
  //   this.$store.dispatch('Login_Localstorage')}
    
  // }
  
  
}
</script>
