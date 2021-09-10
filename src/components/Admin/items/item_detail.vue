<template>
<transition
    name="slide-fade"
    
  >
    
 
    <b-row v-show="isdeleted">
          <b-col sm="3" cols="3">

<b-form-select v-model="color_id" class="mb-3">
      <b-form-select-option v-for="color in get_all_colors" :key="color.id" :value="color.id">{{color.name}}</b-form-select-option>
      </b-form-select>
          </b-col>
          <b-col sm="2" cols="2">
      <b-form-select v-model="size_id" class="mb-3">
      <b-form-select-option v-for="type in get_sizes" :key="type.code" :value="type.code">{{type.sizename}}</b-form-select-option>
      </b-form-select>
          </b-col>
          
          <!-- <b-col sm="2" cols="2"> -->
            
          
          <b-col sm="4" cols="4">
              <b-row>
                  <b-col cols="6">
              <b-form-input v-model="qty" trim type="number"></b-form-input></b-col>
            <b-col cols="6"><b-form-input v-model="discount" type="number" trim></b-form-input></b-col>
            </b-row>
          </b-col>
          <b-col sm="3" cols="3">
              <div class="trash">
            <b-form-input v-model="price" trim type="number"></b-form-input>
            <b-icon-trash-fill class="trashcan" @click="removeitem"></b-icon-trash-fill>
            </div>
          </b-col>

        </b-row>
         </transition>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
   data(){
       return{
           isdeleted:true,
        
discount:'',
price:'',
size_id:0,
color_id:0,
qty:''

}
   },
    computed:{
        ...mapGetters(['get_sizes','get_all_colors'])
    },
    components:{
        
        
    },
    watch:{
        discount:function(val){

            this.$emit('item-detail-values',{color_id:this.color_id,size_id:this.size_id,price:this.price,discount:val,qty:this.qty})
        },
        price:function(val){
            this.$emit('item-detail-values',{color_id:this.color_id,size_id:this.size_id,price:val,discount:this.discount,qty:this.qty})
        },
        size_id:function(val){
            this.$emit('item-detail-values',{color_id:this.color_id,size_id:val,price:this.price,discount:this.discount,qty:this.qty})
        },
        color_id:function(val){
            this.$emit('item-detail-values',{color_id:val,size_id:this.size_id,price:this.price,discount:this.discount,qty:this.qty})
        },
         qty:function(val){
            this.$emit('item-detail-values',{color_id:val,size_id:this.size_id,price:this.price,discount:this.discount,qty:this.val})
        },
    }
    ,
    methods:{
        removeitem(){
            this.isdeleted=false
            this.$emit('remove-item')
        }
    }
}
</script>

<style  scoped>


.colorfilter{
    color:red !important;

    background-color: brown !important;
}
.trash{
    display: flex;
    justify-content: space-around;
}
.trashcan{
    margin-top: 10px;
    margin-left: 15px;
    cursor: pointer;
}
.trashcan:hover{
    color: orange;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>