<template>
<div>
  <adminmenu />
  
<router-view></router-view>
</div>
</template>

<script>

import adminmenu from '../../components/Admin/Menu/menubar.vue'
export default {
components:{
    adminmenu
    
}
}
</script>

<style>

</style>