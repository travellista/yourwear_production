<template>
  <div>
<b-dropdown text="choose orders status">
    <b-dropdown-item @click="()=>{this.status=5}">All Orders</b-dropdown-item>
    <b-dropdown-item @click="()=>{this.status=0}">new orders</b-dropdown-item>
    <b-dropdown-item @click="()=>{this.status=1}">confirmed and waiting to be prepared</b-dropdown-item>
    <b-dropdown-item @click="()=>{this.status=2}">on delivery</b-dropdown-item>
    <b-dropdown-item @click="()=>{this.status=3}">delivered</b-dropdown-item>
    <b-dropdown-item @click="()=>{this.status=4}">canceled</b-dropdown-item>

</b-dropdown>
  <div class="accordion" role="tablist" v-for="(order) in getorders" :key="order.order_id">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block  
         :class="order.visible ? null : 'collapsed'"
      :aria-expanded="order.visible ? 'true' : 'false'"
      :aria-controls="getorderid(order.order_id)"
      @click="order.visible = !order.visible"
        
          :variant="getvarianttype(order.is_confirmed)">
            <b-row class="invotitle">
                
                <b-col cols="3">
                    Order:{{order.order_id}} 
                </b-col>
                
                                    <b-col cols="3"> name:{{order.customer_name}}</b-col>
             <b-col cols="3">phone :{{order.phone}}</b-col>
                
                <b-col cols="3">
                    Order cost:{{gettotalorder(order.details)}} 
                </b-col>
                
                
            </b-row>
                    <b-row class="invotitle">
                    <b-col cols="5">address :{{order.address}}</b-col>
                <b-col cols="3">
                    Order Status:{{get_order_status(order.is_confirmed)}} 
                </b-col>    
                       <b-col cols="2">
                    Order Date:20/10/2020
                </b-col>
                <b-col cols="2">
                    <div>
                        <b-button active variant="success" v-if="order.is_confirmed != 1  && order.is_confirmed != 2 && order.is_confirmed != 3" @click.stop="update_order(order,1)" >Confirm</b-button>
                        <b-button active variant="success" v-if="order.is_confirmed == 1" @click.stop="update_order(order,2)" >prepared</b-button>
                        <b-button active variant="success" v-if="order.is_confirmed == 2" @click.stop="update_order(order,3)" >delivered</b-button>
                        <b-button active variant="danger"  @click.stop="update_order(order,4)" v-if="order.is_confirmed !=4">Cancel</b-button>
                    </div>
                </b-col>

                </b-row>
        </b-button>
      </b-card-header>
      <b-collapse :id="getorderid(order.order_id)"  v-model="order.visible" accordion="my-accordion" role="tabpanel">
        <b-card-body>
         <b-row class="invoheader" >
             
<b-col cols="4">      <div >Name</div></b-col>
<b-col cols="1">      <div>Size</div></b-col>
<b-col cols="1">      <div>Quantity</div></b-col>
<b-col cols="3">      <div>Unit.Price</div></b-col>
<b-col cols="3">      <div>Total Price</div></b-col>

             </b-row>
             <b-row v-for="(details,index) in order.details" :key="index" class="invodetails" 
             
             v-bind:style= "[index % 2 ? {backgroundColor: '#b7d4d3'}: {backgroundColor: '#f8f9fa'}]"

             >
<!-- @click="getprouductdetail(details)" -->
<b-col cols="4">      <div> {{getcolorname(details.color)[0]}} {{getcolorname(details.color)[1]}} {{details.name}}</div></b-col>
<b-col cols="1">      <div>{{details.size}}</div></b-col>
<b-col cols="1">   <div class="qty"> <span @click="update_order_detail_qty(details,details.qty+1)">+  </span>  <div>x {{details.qty}}</div> <span @click="update_order_detail_qty(details,details.qty-1)">-</span></div></b-col>
<b-col cols="3">      <div>{{details.price}}</div></b-col>
<b-col cols="3">      <div>{{details.total_price}}</div></b-col>

             </b-row>
         
         
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data() {
      return {
          visible:false,
          status:0
      }
    },
    computed:{
        ...mapGetters(['getuser','get_requsted_orders','get_filtred_orders'])
        ,
        getorders(){
            return this.$store.getters.get_filtred_orders(this.status)
        }
    },
    mounted(){
        this.$store.dispatch('get_all_orders')
    }
,methods:{
    getprouductdetail(key){
        console.log(key)
    
    this.$store.dispatch('Get_product_details',{id:key.code,color_id:key.color_id}).then(
      
            this.$router.push({name:'productdetail'})

    )
  },
    getcolorname(color)
        {
       var getname=color.split('_')
          return getname
        }
        ,
        getvarianttype(id)
        {
             if(id==0)
            {
                return 'warning'
            }
            else if(id==1)
            {
                return 'light'
            }
            else if(id==2)
            {
                return 'success'
            }
               else if(id==3)
            {
                return 'success'
            }
            else if(id==4)
            {
                return 'danger'
            }

        },
        getorderid(id)
        {   if(isNaN(id))
        {return id}   
             else{
            return 'collapse-'+id.toString()}
        }
        ,
        get_order_status(id){

             if(id==0)
            {
                return 'wait to confirm'
            }
            else if(id==1)
            {
                return 'confirmed and waiting to prepare'
            }
            else if(id==2)
            {
                return 'on delivery'
            }
            else if(id==3)
            {
                return 'delivered'
            }
            else if(id==4)
            {
                return 'canceled'
            }

        },
        gettotalorder(price)
        {var totalprice=0
        
        if(price === undefined ){
            return 0
        }
        price.forEach(element => {
            totalprice+=element.total_price
        });
        return totalprice
        }
        ,
        update_order(order,status){
var updated_order=    {	id:order.order_id,
        is_confirmed: status,
        customer_id: order.customer_id,
        Address: order.address,
        phone_no: order.phone,
}
this.$store.dispatch("Cancel_order",{data:updated_order}).then(
res=>{
    if(res == 204){
        this.$store.dispatch('get_all_orders')
    }
}



)//
        }
,

        update_order_detail_qty(order,qty){
           var updated_order= {	order_id:order.order_id,
        code: order.code,
        color_id: order.color_id,
        size_id: order.size_id,
        qty: qty}
        console.log(updated_order)
        this.$store.dispatch('update_order_detail',{data:updated_order}).then(res=>{
            if(res==204)
            {
                this.$store.dispatch('get_all_orders')
            }
        })

}


        }



}
</script>

<style scoped>
.invoheader{
background-color: #008080;

color: white;

    
}
.invodetails{
    
    padding-top: 10px;
}
.invotitle{
    color:#18180f	
}
.invodetails:hover{
    
}
.qty:hover{
    cursor: pointer;
    color: orange;
}
.qty{
    display: flex;
    justify-content: space-between;
}
</style>