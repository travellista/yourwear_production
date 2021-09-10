<template>
  <div>
    <b-modal v-model="modalShow" hide-footer ref="cart-modal">
      
        <b-container hide-footer fluid>
          <b-row class="my-1">
<b-col cols="12"><div class="cartquestion">Are You Sure you want to remove this item from Cart? </div></b-col>
   </b-row>
   
<b-row class="checkdelete">
<b-col cols="6"> 
    <b-button block variant="danger" @click="deleteproduct(true)">Yes</b-button></b-col>
  <b-col cols="6">  <b-button block variant="success" @click="deleteproduct(false)">No</b-button>
                 
</b-col>
       </b-row>
      
        </b-container>
      
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: "",
      showwarn: false,
    };


  },
  props:{
          modalShow: {
               type: Boolean,
      default: false
          },

},
  methods: {
    
    show_cart_delete_form(){
         
        this.$refs['cart-modal'].show()
      
    },
    hide_cart_delete_form(){
         
        this.$refs['cart-modal'].hide()
      
    }
    ,
    deleteproduct(check)
    {       console.log('hii')
        this.$emit('deletecheck',check)
        this.$refs['cart-modal'].hide()
    }
  },
};
</script>
<style scoped>

.checkdelete{
    display: flex;
    justify-content:space-between;
    margin: auto;

    /* align-items: center; */
}
.cartquestion{
    text-align: center;
    font-weight: bold;
}
</style>