<template>
  <div class="container">

<div v-bind:style="{ backgroundColor: hexa_name }">
    hexa:{{hexa_name}}
    
</div>
<div class="nameicons">
    <div></div>
    <div>name:{{name}}</div> <div>
    <b-icon-trash-fill></b-icon-trash-fill>
    <b-icon-pencil></b-icon-pencil></div></div>

  </div>
</template>

<script>

export default {
    props:{
        id:{
            type:Number

        }
        ,
        hexa_name:{
            type:String
        }
        ,
        name:{
            type:String
        }
    }

}
</script>

<style lang="scss" scoped>

.container{
    border:black 1px solid;
    // width: 40%;
    background-color: white !important;
    padding:0px
}
.nameicons{
    display: flex;
    justify-content: space-between;
}

</style>