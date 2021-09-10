<template>
<div>

  

    <filterbar  @update_products_shown="filterproducts"
    @cancel_products_filter="cancelfilter" />
<div v-if="show">
  <h1>No Data Found</h1>
</div>
<div v-else>
    <div class="cont" >
      <productcard
        v-for="(id, index) in image"
        :key="index"
        :name="id.name"
        :code="id.code"
        :pricebef="id.price"
        :colorname="id.colorname"
        :description="id.description"
        :discount="id.discount"
        :colorid="id.colorid"
        :priceafter="getceil(id.price - id.price * (id.discount / 100))"
        @getsizes="choose_size"
      />
      
    </div>
    <div class="mt-3">
      
      <b-pagination
        v-model="currentPage"
        pills
        :total-rows="this.get_product_items_generic.length"
        :per-page="9"
        align="center"
      ></b-pagination>
    </div>
    </div>
        <warning :modalShow="modalShow" ref="login1-modal"/>

    <sizecart :modalShow="sizeShow" :code="code"
  :color="colorid" ref="size1-modal"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import warning from '../components/Normaluser/product_detail/loginwarning.vue'
import sizecart from '../components/Normaluser/Shared/size_choose.vue'
import productcard from "../components/Normaluser/Categories_products/product_card.vue";
import filterbar from "../components/Normaluser/Categories_products/filtersidebar.vue";
export default {
  data() {
    return {
      modalShow:false,
      sizeShow:false,
      code:'',
      colorid:2,
        currentPage:1,
      perPage: 3,
      show:false,
      no_data_message:{message:'Not Found'}
    };
  },
  components: {
    productcard,
    filterbar,
    sizecart,
    warning
  },
  computed: {
    ...mapGetters(["get_product_items_generic","isauthorized"]),
    image() {
      // console.log(this.getsubcatdetail[0].data.rows)
      var testarr = this.get_product_items_generic;
      if (testarr === undefined) return 0;
      else {
        
        return testarr.slice((this.currentPage-1)*9, (this.currentPage-1)*9+9);
      }
    }
    
  },
  methods:{
     choose_size(product){
      //  debugger;
 if (!this.isauthorized) { 
   this.$refs['login1-modal'].show_login_form()

 }
 else
{   console.log(product)
      this.code=product.code
      this.colorid=product.colorid
      var obj={id:product.code,
      color_id: product.colorid}
      this.$store
            .dispatch("get_available_sizes",  obj ).then(
              res=>{
                console.log(res)
                if(res==200)
                {this.$refs['size1-modal'].show_cart_size_form()}
              }
            )

    }},
    getceil(no)
    {
      return Math.ceil(no)
    },
    filterproducts(filterobject)
    {
      
      this.$store.dispatch('Get_Clothes_gender_cat_filtered',{
        gender_cat:JSON.stringify({genderid:this.$route.params.genderid,clothid:this.$route.params.clothid})
        ,filterobj:JSON.stringify({filterobject})
      }).then(
        res=>{
          if(res == 400)
          {
            this.show=true
          }
          if(res == 200)
          {
            this.show=false
          }
        }
      )
      
    },
    cancelfilter(){
      
       this.$store.dispatch('Get_Clothes_gender_cat',{clothid:this.$route.params.clothid,genderid:this.$route.params.genderid}).
       then(()=>{
                     this.$store.dispatch('Get_Sizes')

       })
       this.show=false
    },
    oncreation(){if( typeof JSON.stringify(this.get_product_items_generic[0].code) === 'undefined'){
       this.$store.dispatch('Get_Clothes_gender_cat',{clothid:this.$route.params.clothid,genderid:this.$route.params.genderid}).
       then(()=>{
                     this.$store.dispatch('Get_Sizes')

       })
    }}
    

  },
  created(){
    setTimeout(this.oncreation,1000)
    
  }
}
</script>

<style>
.cont {

  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
}

</style>