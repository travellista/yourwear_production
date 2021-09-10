<template>
  <div id="app">
    
    
    

    <router-view/>
            <thefooter v-show="get_show_footer" />

  </div>
</template>
<script>
import {mapGetters} from 'vuex'

import thefooter from './components/Shared/footer/site_footer.vue'
// import thenav from './components/Shared/NavBar/menubar.vue'
export default {
  
  components:{
// thenav,
thefooter
  }
  ,computed:{
    ...mapGetters(['get_show_footer','getuser'])
  }
  
,beforeCreate(){
  
     if(localStorage.getItem('currentuser'))
    {
    this.$store.dispatch('Login_Localstorage')}
    }
  
  
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Viaoda+Libre&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
