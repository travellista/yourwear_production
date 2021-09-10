<template>
  <div>
      <h3 class="collection-header">New Collection</h3>
 <b-carousel
      id="carousel-fade"
      v-model="slide"
      :interval="500"
      controls
      indicators
      background="#333"
      img-width="480px"
      img-height="300px"
      style="text-shadow: 1px 1px 2px #333;"
      fade
    >
      <b-carousel-slide v-for="(id,index) in get_product_newcollection" :key="index"
      :caption="id.name">
        <template #img>
          
            <b-img v-bind="mainProps" :src="
        require('!!url-loader?limit=0!../../../assets/' +
          id.code +
          '_' +
          id.colorname +
          '.jpg')
      " fluid alt="Responsive image"
      @click="getprouductdetail(slide)"
      class="newcollectionimg"
      ></b-img>
        </template>
      </b-carousel-slide>
       </b-carousel>



  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
data(){
    return{
      slide:0,
        mainProps: { blank: false, blankColor: '#777', width: 430, height: 480, class: 'm1' }
    }
},
created(){


  this.$store.dispatch('Get_product_newcollection')
}
,
computed:{
  ...mapGetters(['get_product_newcollection','get_product_item_details'])
}
,
methods:{
  getprouductdetail(key){
    
    this.$store.dispatch('Get_product_details',{id:this.get_product_newcollection[key].code,color_id:this.get_product_newcollection[key].colorid}).then(res=>{

      if(res==200){
        this.$router.push({name:'productdetail'})
      }
    }
      
            

    )
  }
}
}
</script>

<style scoped>

.collection-header{
    font-family: 'Viaoda Libre', cursive;
text-align: left;    
margin-left: 10px;
margin-top: 5px;
}
.newcollectionimg:hover{
  cursor: pointer;
  
}

</style>