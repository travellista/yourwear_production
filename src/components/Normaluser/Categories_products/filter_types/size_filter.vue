<template>
  <div class="container">

    <b-form-checkbox
      :id="name"
      v-model="value"
      :name="name"
       value="1"
      unchecked-value="0"
      size="lg"
    >
          <div>{{name}}</div>

    </b-form-checkbox>

    

  </div>
</template>

<script>
  export default {
    props:{
      name:{
        String
      },
      id:{
        String
      }
    },
    data() {
      return {
        value:0
      }
    }
    ,
    watch:{
      value:function(){
        if(this.value > 0)
        {this.$emit('sizeenter',this.id)}
        else
        {this.$emit('removesize',this.id)}
           }
    }
  }
  </script>
  <style lang="scss" scoped>
  .colorcontainer {
  margin: 0.5px;
  height: 20px;
    margin-top: 4px;
  width: 25px;
  border-radius: 30%;
}
.container{
    margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
    
}
div{
    color:black
}
  </style>