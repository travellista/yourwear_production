<template>
  <div>
    <b-modal v-model="modalShow" hide-footer  ref="size-modal" title="Choose from Available Sizes">
      
        <b-container hide-footer fluid>
          <b-row class="my-1">
  <div class="sizecontainerparent">
  <div
  class="sizecontainer"
                    v-for="(item,index) in get_available_sizes"
                    :key="item.size_id" 

                        @click="add_to_cart_sizes(item.size_id,index)"
                  >{{item.size_name}}</div>
                  </div>
                      

          </b-row>    
          <div v-if="showwarn" style="color:red">please choose one of the available sizes</div>
         <div class="addcart"> 
             <b-button  variant="danger" @click="hide_size_cart_form">Cancel</b-button>
             <b-button  variant="success" @click="Add_to_cart">Add To Cart</b-button>  </div>
        </b-container>
      
    </b-modal>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      user: "",
      pass: "",
      sizes:[],
      
      showwarn: false,
    };


  },
  computed:{
      ...mapGetters(['get_available_sizes','get_chosen_product_item_details','getuser'])
  },
  props:{
          modalShow: {
               type: Boolean,
      default: true
          },
          product:{
              type:Object
              
          }
          ,color:{
              type:Number
          },
          code:{
              type:String
          }

},
  methods: {
       toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
add_to_cart_sizes(id,index){
    this.showwarn=false
    
var res=this.sizes.filter(s=>
    s==id
)
if(res.length == 0)
{
    document.getElementsByClassName('sizecontainer')[index].style.backgroundColor = "orange"
    this.sizes.push(id)
}
else {
    this.sizes=this.sizes.filter(s=>
    s!=id)
    document.getElementsByClassName('sizecontainer')[index].style.backgroundColor = "gray"
}
},
    
    show_cart_size_form(){
         
        this.$refs['size-modal'].show()
      
    },
    hide_size_cart_form(){
         
        this.$refs['size-modal'].hide()
        this.product={}
        this.sizes=[]
      
    }
    ,
    Add_to_cart(){
        if(this.sizes.length == 0)
        {
        
        //this.$refs['size-modal'].hide()
        this.showwarn=true
        return

        }
        
            var cartobj =[{}]
this.sizes.forEach((s,index)=>
   {        
    //    console.log(index)
    //      console.log(s)
         cartobj[index]={}
        //  cartobj[index].color_id=this.get_chosen_product_item_details.colorid
        //  cartobj[index].code=this.get_chosen_product_item_details.code
         cartobj[index].color_id=this.color
         cartobj[index].code=this.code
         cartobj[index].customer_id=this.getuser.id
         cartobj[index].qty=1
         cartobj[index].size_id=s
   })
    

         this.$store.dispatch("Add_to_cart",{data :JSON.stringify(cartobj)})
         .then(res=>{
        
        if(res == 200)
        {    this.toast('Added to cart','success')
            this.hide_size_cart_form()
        }
        else if(res==409)
        {this.hide_size_cart_form()
                this.toast('item already exists in cart','danger')
            }
             }    );

                    


    }
    
  },
};
</script>
<style scoped>
.sizecontainer  {
  margin: 5px;
 min-width:  35px;
  min-height: 35px;
 
  border-radius: 50%;
  text-align: center;
  font-size: 4.3vh;
  background-color:gray;
  align-items: center;
}
.sizecontainerparent{
    display: flex;
}
.sizecontainer:hover{
    cursor: pointer;
    background-color: orange;
    
}
.addcart{
    text-align: end;
}
.addcart button:first-of-type{
    margin-right: 10px;
}
</style>