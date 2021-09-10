<template>
  <div>
<div @click="tryy" >jee</div>
      
  </div>

</template>

<script>
import cipher from '@/assets/js/enc-dec.js'




export default {
    methods:{
         
    tryy(){
            
              const encHash = cipher.aesEncrypt('amir')
              console.log(encHash)
              
              const dec=cipher.aesDencrypt(encHash)
              console.log(dec)

    }



    }

}
</script>

<style>

</style>