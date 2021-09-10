<template>
  <div>
  <b-card no-body>
                        <insertitem  class="additem" ref="itemcard" :productinfo="product" :openmode="openmode"/>
                        <deleteproduct  ref="deleteproduct-modal" @deletecheck="deletecheck"/>
    <b-tabs card>

      <b-tab  v-for="id in getgenders"
      :key="id.id"
      :title="id.name"
      @click="set_all_items_filtered(id.id)"  >
        <!-- <b-card-text>{{id.name}}</b-card-text> -->

        <genderitems @open-edit-item="edititem" @delete-product="delete_product"/>

      </b-tab>
      
    </b-tabs>
      </b-card>
      
      </div>
</template>

<script>
import genderitems from './items_card.vue'
import insertitem from './new_item.vue'
import deleteproduct from './deleteproduct.vue'
import {mapGetters,mapMutations} from 'vuex'

export default {
  data(){
    return{
      product:{},
      openmode:0,
      selectedproduct:0,
      modal:false
      
    }
  },
    components:{
        genderitems,
        insertitem,
        deleteproduct
    },
    computed:{
        ...mapGetters(['getgenders','get_all_items'])
    },
    methods:{

        ...mapMutations(['set_all_items_filtered']),
        toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
       
       edititem(id){
         
         this.product=this.get_all_items.filter(x=>{
           return x.code==id
         })
         
        this.openmode=1
        //this.product=JSON.stringify(this.product)
        setTimeout(()=>{this.$refs.itemcard.$refs.showmodalbtn.click()},
        10)
       },
       delete_product(id)
       {this.$refs['deleteproduct-modal'].show_cart_delete_form()
        this.selectedproduct=id
       
       },
       deletecheck(check)
       {
         if(check){
            this.$store.dispatch('Delete_item',this.selectedproduct).then(res=>{
                if(res==200){
                  this.$store.dispatch('Get_all_items')
                  this.toast("deleted successfully","success")
                }
                else 
                {
                  this.toast("delete fail","danger")
                }

            })
         }
       }
    }
    
    

}
</script>

<style>

</style>