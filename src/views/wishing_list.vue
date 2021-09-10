<template>
  <div>
<b-container fluid>
   
   <b-row v-for="(product,index) in getwishlist"
   :key="index"
   align-v="center"
   class="wishproduct"
   >

    <b-col cols="12" lg="4">  <b-img :src="
        require('!!url-loader?limit=0!../assets/' +
          product.code +
          '_' +
          product.colorname +
          '.jpg')
          
      " 
      v-bind="mainProps"
      rounded
      fluid alt="Responsive image" 
      @click="getproductdetail(product.code,product.color_id)"
      class="imgproduct"
      
      ></b-img>
</b-col>
    <b-col cols="4" lg="3">{{product.name}}</b-col>
    <b-col cols="4" lg="3"><div class="prices"><div v-show="product.discount > 0">{{product.price}}</div>
    <div>{{product.price-(product.price*product.discount/100)}}</div>
</div>
      </b-col>
    
    <b-col cols="4" lg="2" ><b-icon-cart-plus class="imgproduct" @click="choose_size(product)"></b-icon-cart-plus>
                        <b-icon-trash-fill class="imgproduct" @click="delete_product(product)"></b-icon-trash-fill>
    </b-col>
  </b-row>
</b-container>
 <warning :modalShow="modalShow" ref="login-modal"/>
    <sizecart :modalShow="sizeShow" :product="get_chosen_product_item_details"
    :code="get_chosen_product_item_details.code"
    :color="get_chosen_product_item_details.color_id"
     ref="size-modal"/>
  </div>
</template>

<script>
import warning from '../components/Normaluser/product_detail/loginwarning.vue'
import sizecart from '../components/Normaluser/Shared/size_choose.vue'
import {mapGetters} from 'vuex'
export default {
  components:{
    sizecart,
    warning
  },
   data() {
      return {
        modalShow:false,
      sizeShow:false,
        get_chosen_product_item_details:{},
        mainProps: { blank: false, blankColor: '#777', width: screen.width*0.4, height: screen.height*0.4, class: 'm1' }
      }
    },
computed:{

  ...mapGetters(['getwishlist','isauthorized','getuser'])
},
created(){

if(screen.width>700){
this.mainProps.width=screen.width*0.2
this.mainProps.height=screen.height*0.2}
},
methods:{
  getproductdetail(code,colorid){
    
    this.$store.dispatch('Get_product_details',{id:code,color_id:colorid}).then(
      
            this.$router.push({name:'productdetail'})

    )
  },
  choose_size(product){
    this.get_chosen_product_item_details=product
 if (!this.isauthorized) { 
   this.$refs['login-modal'].show_login_form()

 }
 else
{


      var obj={id:product.code,
      color_id: product.color_id}
      this.$store
            .dispatch("get_available_sizes",  obj ).then(
              res=>{
                if(res==200)
                {this.$refs['size-modal'].show_cart_size_form()}
              }
            )

    }},
    delete_product(product){
      product.customer_id=this.getuser.user.id

this.$store.dispatch('Deletewishing_list',{ data: JSON.stringify(product)}).then(res=>{
  if (res==200){

     this.$store.dispatch('get_wish_list')
  }
})

    }
}
}
</script>

<style scoped>


.wishproduct{
  border: black solid; 
  font-weight: bold;
  font-size: 28px;
}
.imgproduct:hover{
  cursor: pointer;
  color: orange;
  font-size: 35px;

}
.prices {

  font-weight: bold;
  font-size: 30px;
}
.prices div:first-of-type{
  color:#9B2847;
  text-decoration: line-through;

}
</style>