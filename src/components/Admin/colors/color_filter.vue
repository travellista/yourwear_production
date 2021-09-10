<template>
<div>
    <h2>Search For Colors</h2>
    <b-input type="text" v-model="text" @keyup="search_colors(text)" size="md" ></b-input>

</div>
  
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    data() {
        return {
                    text:''}},
methods:{
     
        ...mapMutations(['search_colors'])
         

}}
</script>

<style lang="scss" scoped>

h2{
    color:white
}

</style>