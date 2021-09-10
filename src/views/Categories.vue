<template>
  <div class="containers">
    <div
      v-for="id in get_genders_types"
      :key="id.ClothesId"
      :style="{
        backgroundImage: 'url(' + require('../assets/' + id.genderID+'_'+id.ItemName + '.jpg') + ')'
      }"
      @click="getproducts(id.ClothesId,id.genderID)"
    >
      <span>{{ id.ItemName }}</span>
    </div>
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['get_genders_types','get_product_items_generic'])
    },
    created(){
this.$store.dispatch('Get_Genders_Types',this.$route.params.genderId)
    }
    ,
        watch: {
    '$route.params.genderId': function (id) {
this.$store.dispatch('Get_Genders_Types',id)

}
    },
    methods:{
      getproducts(cat,gender){
          
          this.$store.dispatch('Get_Clothes_gender_cat',{clothid:cat,genderid:gender}).then(res=>{
              if(res ==200){
            this.$store.dispatch('Get_Sizes').then(respo=>{
              if(respo == 200){
                this.$router.push({name:'catproduct',params:{genderid:gender,clothid:cat}})
              }
            })
            }}
          )
      }
      
    }

}
</script>

<style  scoped>
.containers div {
width: 100%;
text-align: left;
background-size:cover;
}
.containers {
  display: flex;
  justify-content: space-between;
  transform: rotate(90);
}

.containers div:hover {
  cursor: pointer;
}
span {
  margin-top: 20px;
  font-size: 50px;
  writing-mode: vertical-lr;
  text-orientation: upright;
}
</style>
