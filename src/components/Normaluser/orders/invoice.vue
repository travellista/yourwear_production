<template>
  <div>

<b-card class="invoice"  title="Invoice">

    <b-row class="invheader">
        <b-col cols="12">
    <div>
        Name : {{getuser.name}}
        </div> 
        </b-col>
        <b-col cols="12">
    <div>
        Address : {{getuser.address}}
        </div> 
        </b-col><b-col cols="6">
    <div>
        phone : {{getuser.phone}}
        </div> 
        </b-col>
        </b-row>
<b-row class="invcolheader">
<b-col cols="5"><div class="invotitle">Name</div></b-col>
<b-col cols="2"><div class="invotitle">Qty</div></b-col>
<b-col cols="2"><div class="invotitle">Unit.price</div></b-col>
<b-col cols="3"><div class="invotitle">Total Price</div></b-col>

</b-row>
<b-row v-for="(id,index) in get_cart_list"
:key="index">

    <b-col cols="5"><div>{{getcolorname(id.colorname)[0]}}   {{getcolorname(id.colorname)[1]}} {{id.name}}</div></b-col>
    <b-col cols="2"><div>x{{id.qty}}</div></b-col>
    <b-col cols="2"><div>{{id.price -(id.price * id.discount /100)}}</div></b-col>
    <b-col cols="3"><div>{{id.qty *(id.price -(id.price * id.discount /100))}}</div></b-col>
        

</b-row>
<template #footer>
    <div class="footerinv">
    <div class="invtotal"> 

        TotalPrice: {{ get_cart_totalprice }}

</div>
<div >
    <b-button variant="success" @click="check_confirm_order">
    <b-icon-check >
    </b-icon-check>
            Confirm Order
    </b-button>
</div>

</div>
</template>


</b-card>
<addorder :modalShow="modalShow" ref="order-modal" @ordercheck="ordercheck"/>

  </div>
</template>

<script>
import addorder from './addorder.vue'
import {mapGetters} from 'vuex'
export default {
    components:{
        addorder
    },
    computed:{
...mapGetters(['get_cart_list','getuser','get_cart_totalprice'])}
,methods:{
     toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
    getcolorname(color)
        {
       var getname=color.split('_')
          return getname
        }
        ,
        check_confirm_order(){
this.$refs['order-modal'].show_cart_delete_form()


  },
  ordercheck(answer){
      if(answer)
      {

          var orderlist=[]
for(var i = 0, length = this.get_cart_list.length; i < length; i++)
{
    

orderlist.push({code:this.get_cart_list[i].code,qty:this.get_cart_list[i].qty,color_id
:this.get_cart_list[i].colorid,size_id:this.get_cart_list[i].size})
}
console.log(orderlist)


          let today = new Date().toISOString().slice(0, 10)
          var order={order_date:today,
         customer_id:this.getuser.id,
        phone_no:this.getuser.phone,
        Address:this.getuser.address,
        is_confirmed:0,
        order_details:orderlist
    }
          
       
this.$store.dispatch('Confirm_order',{data :JSON.stringify(order)}).then(
    res=>{
        if(res==201)
        {
            this.toast('order is being proccessed','success')
                        setTimeout(()=>{this.$router.push({name:'Home'})},2000)

}else{     this.toast('there is an error try again later','danger')}
    }
)        
          


          
      }
      else {
                  this.toast('you havent confirmed the order','danger')
      
      }

  }
}
}
</script>

<style scoped>

.invoice{
    background-color: #FFFFBF;
}
.invcolheader{
    background-color: #97904a;
    border-radius: 5%;
    padding-left: 30px;
}
.card-body{
    padding-top:0px !important;
}
.invheader{
    text-align: left;
    padding-left: 10px;
    font-size: 25px;
    font-weight: bold;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.invtotal{
    font-size: 30px;
}
.footerinv{
    display: flex;
    justify-content: space-evenly;
}
</style>