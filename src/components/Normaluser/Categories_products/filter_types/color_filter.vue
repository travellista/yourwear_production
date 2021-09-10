<template>
  <div class="container">

    <b-form-checkbox
      :id="hexacolor"
      v-model="value"
      :name="hexacolor"
      value="1"
      unchecked-value="0"
      size="lg"
    >
    </b-form-checkbox>
    
    
      <div v-bind:style="{ backgroundColor: hexacolor }" class="colorcontainer"></div>
      
      
      <div v-bind:style="{ color: hexacolor }">{{getcolorname(colorname)[0]}} {{getcolorname(colorname)[1]}} </div>
    
    
  </div>
</template>

<script>
  export default {
    props:{
      colorid:{
        String
      },
      hexacolor:{
        String
      }
      ,colorname:{
        String
      }
    },
    data() {
      return {
        value: 0
      }
    },methods:{
        getcolorname(color)
        {
          try{
       var getname=color.split('_')
          return getname}
          catch(err){
            return
          }
        }
    }
    ,watch:{
      value:function(){
        if(this.value > 0)
        {this.$emit('colorenter',this.colorid)}
        else
        {this.$emit('removecolor',this.colorid)}
           }
    }

  }
  </script>
  <style lang="scss" scoped>
  .colorcontainer {
  margin: 0.5px 10px;
  height: 20px;
    margin-top: 4px;
  width: 25px;
  border-radius: 30%;
  
}
.container{
  //   margin: auto;
  display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
    
}
div{
    color:black
}
  </style>