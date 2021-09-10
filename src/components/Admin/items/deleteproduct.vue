<template>
  <div>
    <b-modal v-model="modalShow" hide-footer ref="deleteproduct-modal">
      
        <b-container hide-footer fluid>
          <b-row class="my-1">
<b-col cols="12"><div class="cartquestion">Are You Sure you want to delete this Product? </div></b-col>
   </b-row>
   
<b-row class="checkdelete">
<b-col cols="6"> 
    <b-button block variant="success" @click="confirmdelete(true)">Yes</b-button></b-col>
  <b-col cols="6">  <b-button block variant="danger" @click="confirmdelete(false)">No</b-button>
                 
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
         debugger;
        this.$refs['deleteproduct-modal'].show()
      
    },
    hide_cart_delete_form(){
         
        this.$refs['deleteproduct-modal'].hide()
      
    }
    ,
    confirmdelete(check)
    {       
        this.$emit('deletecheck',check)
        this.$refs['deleteproduct-modal'].hide()
    }
  }
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