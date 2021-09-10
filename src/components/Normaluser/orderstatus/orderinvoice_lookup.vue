<template>
  <div>

  <div class="accordion" role="tablist" v-for="(order) in get_requsted_orders" :key="order.order_id">
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
                    Order Id:{{order.order_id}} 
                </b-col>
                
                <b-col cols="3">
                    Order Date:20/10/2020
                </b-col>

                <b-col cols="3">
                    Order Status:{{get_order_status(order.is_confirmed)}} 
                </b-col>
                <b-col cols="3">
                    Order cost:{{gettotalorder(order.details)}} 
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
@click="getprouductdetail(details)"
             >

<b-col cols="4">      <div> {{getcolorname(details.color)[0]}} {{getcolorname(details.color)[1]}} {{details.name}}</div></b-col>
<b-col cols="1">      <div>{{details.size}}</div></b-col>
<b-col cols="1">      <div>x {{details.qty}}</div></b-col>
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
          visible:false
      }
    },
    computed:{
        ...mapGetters(['getuser','get_requsted_orders'])
    },
    mounted(){
        this.$store.dispatch('get_my_orders',this.getuser.id)
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
                return 'success'
            }
            else if(id==2)
            {
                return 'success'
            }
            else if(id==0)
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
                return 'preparing'
            }
            else if(id==1)
            {
                return 'on delivery'
            }
            else if(id==2)
            {
                return 'delivered'
            }
            else if(id==3)
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
        

},

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
    cursor: pointer;
}

</style>