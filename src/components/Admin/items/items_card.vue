<template>
<div>
  <div class="accordion" role="tablist" v-for="(item) in get_all_items_filtered" :key="item.code">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block  
         :class="item.visible ? null : 'collapsed'"
      :aria-expanded="item.visible ? 'true' : 'false'"
      :aria-controls="getitemid(item.code)"
      @click="item.visible = !item.visible"
        
          variant="light">
            <b-row class="invotitle">
                
                <b-col cols="1">
                     code:{{item.code}} 
                </b-col>
                
                <b-col cols="3">
                    {{item.name}}
                </b-col>

                <!-- <b-col cols="1">
                    price:{{item.price}} 
                </b-col> -->
                <b-col cols="8">
                  <b-row>
                    <b-col cols="10">{{item.description}} </b-col>
                    <b-col cols="2">
                      <b-icon-trash-fill @click.stop="delete_product(item.code)" class="penciledit"></b-icon-trash-fill>
                      <b-icon-pencil @click.stop="edit_product(item.code)" class="penciledit"></b-icon-pencil></b-col>
                  
                  </b-row>
                    
                  

                </b-col>
                
                
            </b-row>

        </b-button>
      </b-card-header>
      <b-collapse :id="getitemid(item.code)"  v-model="item.visible" accordion="my-accordion" role="tabpanel">
        <b-card-body>
         <b-row class="invoheader" >
             
<b-col cols="2"><div >Color</div></b-col>
<b-col cols="2"><div>Size</div></b-col>
<b-col cols="1"><div>Quantity</div></b-col>
<b-col cols="2"><div>Price</div></b-col>
<b-col cols="1"><div>Discount</div></b-col>
<b-col cols="1"><div>Actual price</div></b-col>
<b-col cols="3"><div>Date Added</div></b-col>

             </b-row>
             <b-row v-for="(details,index) in item.detail" :key="index" class="invodetails" 
             
             v-bind:style= "[index % 2 ? {backgroundColor: '#b7d4d3'}: {backgroundColor: '#f8f9fa'}]"
             >

<b-col cols="2">      <div>  {{details.name}}</div></b-col>
<b-col cols="2">      <div>{{details.size_name}}</div></b-col>
<b-col cols="1">      <div>x {{details.qty}}</div></b-col>
<b-col cols="2">      <div>{{details.price}}</div></b-col>
<b-col cols="1">      <div>{{details.discount}}</div></b-col>
<b-col cols="1">      <div>{{details.price-(details.price*details.discount/100)}}</div></b-col>
<b-col cols="3">      <div>{{details.data_added}}</div></b-col>

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
  components:{
  },
    data() {
      return {
          visible:false
      }},
    computed:{
        ...mapGetters(['getgenders','get_all_items','get_all_items_filtered'])
    }
    ,
    methods:{
         getitemid(id)
        {   if(isNaN(id))
        {return id}   
             else{
            return 'collapse-'+id.toString()}
        }
        ,
        edit_product(id){
            this.$emit('open-edit-item',id)

          }
          ,
          delete_product(id){
                 
this.$emit('delete-product',id)
  


            // this.$store.dispatch('Delete_item',id).then(res=>{
            //     if(res==200){
            //       this.$store.dispatch('Get_all_items')
            //     }

            // })

          }
         
         
    }

}
</script>

<style  scoped>

.invotitle{
font-size: 1.5vw;
}
.penciledit{
  margin-left: 1.3rem;
}
.penciledit:hover{
color:orange

}

</style>