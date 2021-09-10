<template>
  <div>
    <b-modal v-model="modalShow" hide-footer ref="order-modal">
      
        <b-container hide-footer fluid>
          <b-row class="my-1">
<b-col cols="12"><div class="cartquestion">Are You Sure you want to Confirm this Order? </div></b-col>
   </b-row>
   
<b-row class="checkdelete">
<b-col cols="6"> 
    <b-button block variant="success" @click="confirmorder(true)">Yes</b-button></b-col>
  <b-col cols="6">  <b-button block variant="danger" @click="confirmorder(false)">No</b-button>
                 
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
         
        this.$refs['order-modal'].show()
      
    },
    hide_cart_delete_form(){
         
        this.$refs['order-modal'].hide()
      
    }
    ,
    confirmorder(check)
    {       
        this.$emit('ordercheck',check)
        this.$refs['order-modal'].hide()
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