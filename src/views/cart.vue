
<template>
  <div>
    <cartmodal :modalShow="modalShow" ref="cart-modal" @deletecheck="deletefromcart"/>
    <DataTable :value="get_cart_list" :resizableColumns="true" columnResizeMode="fit" showGridlines  responsiveLayout="stack" breakpoint="960px">
      <template #header>
        <div class="table-header">
          Products in cart
        </div>
      </template> 
       <Column header="Image" 
       bodyClass="cartimage"
       
       :colspan="1" 
        >
        <template #body="slotProps">
         <b-img :src="
        require('!!url-loader?limit=0!../assets/' +
          slotProps.data.code +
          '_' +
          slotProps.data.colorname +
          '.jpg')
          
      " 
      class="imgproduct"
      v-bind="mainProps"
      rounded="circle"
      fluid alt="Responsive image" 
      @click="getproductdetail(slotProps.data.code,slotProps.data.colorid)"
      
      
      ></b-img>
        </template>
      </Column>
      <Column
        field="name"
        header="Name"
        bodyClass="cartname" 
        :colspan="2" 
        bodyStyle="background-color:#F5F5F5; text-align: center;  font-size:15px; font-weight:bold width=40%"
     ></Column>
     <Column
        field="sizename"
        header="Size"
        bodyClass="cartsize" 
        :colspan="1" 
        bodyStyle=" text-align: center; font-size:40px width=10% "
     ></Column>
      <Column
        field="price"
        header="Price"
        bodyClass="cartprice" 
        :colspan="1" 
        bodyStyle="background-color:#F5F5F5; text-align: center; "
     >
        <template #body="slotProps">
         <div class="prices"><div v-show="slotProps.data.discount > 0">{{slotProps.data.price}}</div>
    <div>{{slotProps.data.price-(slotProps.data.price*slotProps.data.discount/100)}}</div>
</div>
        </template>
      </Column>

      <Column
        field="qty"
        header="Quantity"
        bodyClass="cartqty" 
        :colspan="2" 
        bodyStyle="text-align: center;"
     >
        <template #body="slotProps"
          ><div class="qtycontainer">
            
           <span class="changeqty" @click="increment_cart(slotProps.data)">+</span> <div>{{ slotProps.data.qty }}</div>
           <span class="changeqty" @click="deccrement_cart(slotProps.data)">-</span>
          </div>
        </template>
      </Column>
      <Column
        header="Cost"
        bodyStyle="text-align: center;  background-color:#F5F5F5; "
        :colspan="1" 
        bodyClass="carttotalprice" 
        
      >
        <template #body="slotProps">
         {{ (slotProps.data.price-(slotProps.data.price*slotProps.data.discount/100)) * slotProps.data.qty }} 

        </template>
      </Column>
      <Column
        bodyStyle="text-align: center; "
        :style="{width:'10px'}"
        :colspan="1" 
        bodyClass='clearcart'>

        <template #body="slotProps">
       <div>  <span v-show="false"> {{ slotProps.data.price * slotProps.data.qty }}</span>
                      <b-icon-trash-fill class="cartclear" @click="check_deletefromcart(slotProps.data)"></b-icon-trash-fill>
        </div>
        </template>
      </Column>
      

      <template #footer>
        <h2>In total there are {{ get_cart_count }} products.</h2>
        <div>
          <b-container fluid>
          <b-row>
            <b-col  cols="6" sm="12">
        <div>
          <h1>Totalprice: {{ get_cart_totalprice }} egp</h1>

        </div>
        </b-col>
        <b-col cols="6" sm="12">
        <div >
          <b-button variant="warning" @click="confirm_order" v-show="get_cart_totalprice>0"> 
            <b-icon-list-check> </b-icon-list-check>
            <router-link to="checkout" >Proceed To Check Out</router-link>
          </b-button>
        </div>
        </b-col>
                  </b-row>
                  </b-container>

        </div>
      </template>
    </DataTable>

    

  </div>
</template>

<script>
import cartmodal from '../components/Normaluser/cart/cartdelete.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import{mapGetters} from 'vuex'
export default { 
    components:{
        DataTable,
        Column,
        cartmodal
    },
   data(){
       return{
         mainProps: { blank: false, blankColor: '#777', width:120, height: 80, class: 'm1' },
         item_to_delete:{}
     
       }
   },
   methods:{
     toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
      getproductdetail(code,colorid){
    
    this.$store.dispatch('Get_product_details',{id:code,color_id:colorid}).then(
      
            this.$router.push({name:'productdetail'})

    )
  },
  check_deletefromcart(cartid){
this.$refs['cart-modal'].show_cart_delete_form()
this.item_to_delete=cartid

  },
deletefromcart(check)
{
  if(check)
  {
    var cartobject={customer_id:this.getuser.id,code:this.item_to_delete.code,size_id:this.item_to_delete.size,color_id:this.item_to_delete.colorid,qty:parseInt(this.item_to_delete.qty)}
        this.$store.dispatch("delete_from_cart_list",{data :JSON.stringify(cartobject)}).then(
          res=>{
          if(res== 200){
          
       this.$store.dispatch('get_cart_list')    
                       this.toast('successful removed cart','success')



          }
          else{
                                   this.toast('cant remove from cart','danger')

          }
          })
    

  }
  else{
return  }
},

  increment_cart(cartid)
  { 
    
    var cartobject={customer_id:this.getuser.id,code:cartid.code,size_id:cartid.size,color_id:cartid.colorid,qty:parseInt(cartid.qty)+1}
    this.$store.dispatch("update_cart_list",{data :JSON.stringify(cartobject)})
         .then(res=>{
        
        if(res==204)
        {
       this.$store.dispatch('get_cart_list')    
        }
        
        
         });
  },
  deccrement_cart(cartid)
  { if(parseInt(cartid.qty) == 1)
  {
    this.check_deletefromcart(cartid)
    return
  }


    var cartobject={customer_id:this.getuser.id,code:cartid.code,size_id:cartid.size,color_id:cartid.colorid,qty:parseInt(cartid.qty)-1}
    this.$store.dispatch("update_cart_list",{data :JSON.stringify(cartobject)})
         .then(res=>{
        
        if(res==204)
        {
       this.$store.dispatch('get_cart_list')    
        }
        
        
         });
  }
   }
   , created(){
       this.$store.dispatch('get_cart_list')
   }
   , computed:{
       ...mapGetters(['get_cart_list','get_cart_count','get_cart_totalprice','getuser'])
   },updated(){
var elements = document.getElementsByClassName('cartimage');
    for(var i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="1"
   }
      elements=document.getElementsByClassName("cartname")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="2"
elements[i].style.fontWeight="bold"
   }
   
    
   
      elements=document.getElementsByClassName("cartsize")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="1"
elements[i].style.fontWeight="bold"
elements[i].style.fontSize="30px"
   }
      elements=document.getElementsByClassName("cartprice")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="1"
elements[i].style.fontWeight="bold"
elements[i].style.fontSize="30px"
   }
      elements=document.getElementsByClassName("cartqty")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="2"
elements[i].style.fontWeight="bold"
   }
      elements=document.getElementsByClassName("carttotalprice")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="1"
elements[i].style.fontWeight="bold"
elements[i].style.fontSize="22px"

   }
      elements=document.getElementsByClassName("clearcart")
      for( i = 0, length = elements.length; i < length; i++) {    
elements[i].colSpan="1"
elements[i].style.fontSize="30px"

elements[i].style.fontWeight="bold"
   }
    
    
    
    
    
   }
   
   
   
}
</script>

<style lang="scss" scoped>

.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}


.qtycontainer {
  font-size: 25px;
  display: flex;
  justify-content: space-between;
}

.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product{
  
  font-weight: bold;
}
.product-image {
  width: 50;
  height: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.p-datatable .p-datatable-thead > tr > th {
  text-align: center !important;
}

.p-datatable .p-datatable-tbody > tr > td {
  text-align: center;
}
.prices {

  font-weight: bold;
}
.prices div:first-of-type{
  color:#9B2847;
  text-decoration: line-through;
  
}
.changeqty:hover{
  color: orange;
  cursor: pointer;
}
.imgproduct:hover{
  transform: scale(1.5);
  cursor: pointer;
}
.imgproduct{
  transition: transform .5s linear
}
.cartclear:hover{
  cursor: pointer;
  color:orange
}
</style>
