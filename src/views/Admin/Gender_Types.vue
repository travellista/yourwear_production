<template>
<div>
<b-container fluid>
    <b-row>
        <b-col cols="6">
<div class="headertype">
 <h1>Gender</h1>
 <div class="headertype">
 <b-button variant="success" @click="ADD_NEW_GENDER">Add new Gender</b-button>
     <b-form-input v-model="newgender" placeholder="Enter New Gender"></b-form-input>
 </div>

 </div>
 
  <div v-for="gender in getgenders"
  :key="gender.id"
  class="genderclothes"
  @click="gendertype(gender.id,gender.name)">{{gender.name}} 
  
  <b-icon-trash-fill @click="Delete_Gender(gender.id)" class="icontrash"></b-icon-trash-fill>

  
  </div>
  </b-col>
  <b-col cols="6">
<div class="headertype">
 <h1>TYPES</h1>
 <div class="headertype">
 <b-button variant="success" @click="ADD_NEW_TYPE">Add new Type</b-button>
     <b-form-input v-model="newCategory" placeholder="Enter New Type"></b-form-input>
 </div>

 </div>
 
  <div v-for="types in get_all_clothes_types"
  :key="types.id"
  class="genderclothes"
 >{{types.name}} 
  
  <b-icon-trash-fill @click="Delete_Type(types.id)" class="icontrash"></b-icon-trash-fill>

  
  </div>

  </b-col>
  </b-row>
  </b-container>
    <div class="headertype">
    <h1>{{gendername}} Category </h1>
    <div class="headertype" v-if="choosenname!=0 && myArrayFiltered.length>0">
    <b-button variant="success" @click="ADD_NEW_GENDER_TYPE">Add new Category</b-button>
     <b-form-select v-model="selectedcats"  multiple :select-size="4">

    <b-form-select-option v-for="type in myArrayFiltered" :key="type.id" :value="type.id">{{type.name}}</b-form-select-option>
    
     </b-form-select>
    
     </div>
    </div>
    <div v-for="item in get_genders_types"
  :key="item"
    class="genderclothes"

>{{item.ItemName}}

<b-icon-trash-fill @click="DELETE_NEW_GENDER_TYPE(item)" class="icontrash"></b-icon-trash-fill>

</div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            newgender:"",
            newCategory:"",
            choosenname:0,
            gendername:"",
            selectedcats:"",
            myArrayFiltered:[]
            
        }
    },
    computed:{

...mapGetters(['getgenders','get_genders_types','get_all_clothes_types'])
,
// types_options(){
// return myArrayFiltered
// }

    },
    methods:{
        gendertype(id,name)
        {this.choosenname=id
        this.gendername=name
            this.$store.dispatch('Get_Genders_Types',id)
            
         }
         ,
ADD_NEW_GENDER(){
    
    this.$store.dispatch('ADD_NEW_GENDER',JSON.stringify({name:this.newgender})).then(res=>{
        console.log(res)
        if(res==201)
        {this.$store.dispatch('Get_Genders')}
    })
    
},
Delete_Gender(id){
 this.$store.dispatch('DELETE_GENDER',id).then(res=>{
        if(res==200)
        {this.$store.dispatch('Get_Genders')}
    })
    
},



GET_ALL_TYPES(){
    this.$store.dispatch('GET_ALL_TYPES')   
},
ADD_NEW_TYPE(){
    
    this.$store.dispatch('ADD_NEW_TYPE',JSON.stringify({name:this.newCategory})).then(res=>{
        console.log(res)
        if(res==201)
        {this.$store.dispatch('GET_ALL_TYPES')}
    })
    
},
Delete_Type(id){

this.$store.dispatch('DELETE_TYPE',id).then(res=>{
        if(res==200)
        {this.$store.dispatch('GET_ALL_TYPES')}
    })

    }
    ,
    ADD_NEW_GENDER_TYPE(){

            if(this.selectedcats=="") {
                this.toast("choose a type","danger")
                return}         
         this.$store.dispatch('ADD_NEW_GENDER_TYPE',JSON.stringify({clothes_id:this.selectedcats[0],gender_id:this.choosenname})).then(res=>{

                if(res==201)
              {this.$store.dispatch('Get_Genders_Types',this.choosenname)}
         })

    },
    DELETE_NEW_GENDER_TYPE(item){

        
         this.$store.dispatch('DELETE_NEW_GENDER_TYPE',item).then(res=>{
             console.log(res)

                if(res==200)
              {this.$store.dispatch('Get_Genders_Types',this.choosenname)}
         })

    },
     toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
    
    
    },
    watch:{
        get_genders_types:function()
        {   
          this.myArrayFiltered = this.get_all_clothes_types.filter(el => {
      return !this.get_genders_types.find(element => {
         return element.ClothesId === el.id;
         
      });
   });

}
    }

}
</script>

<style  scoped>


.genderclothes{
background-color: gray;
font-size: 2rem;
}

.genderclothes:hover  {
cursor: pointer;
}
.headertype{
    display: flex;
    justify-content: space-around;
}
.icontrash{
    float: right;
    margin-right: 3rem;
}
.icontrash:hover{
color:orange;
cursor: pointer;

}
</style>