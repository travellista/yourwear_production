<template>
  <div class="container">
              
              
<ColorPicker v-model="hexa_name" class="colorpic"/>
 <b-form-group
              id="input-group-3"
              label="hexa name"
              label-for="input-2"
              
            >
              <b-form-input
                id="input-2"
                v-model="hexa_name"
                
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-3"
              label="color name"
              label-for="input-2"
              
            >
              <b-form-input
                id="input-2"
                v-model="color_name"
                @focus="()=>{showalert=false}"
                
              ></b-form-input>
                <b-alert show variant="danger" v-show="showalert" >Name is Empty</b-alert>

            </b-form-group>

<b-button variant="warning" @click="add_color">
Add
</b-button>


  </div>

</template>

<script>
import ColorPicker from "primevue/colorpicker";

export default {
    components:{
        ColorPicker
    }
    ,
    data(){
        return{
            showalert:false,
            hexa_name:'',
            color_name:''
        }
    }
    ,
    methods:{
add_color(){
    if(this.color_name == '')
    {
        this.showalert= true
        return
    }
    else{
        var new_color={
            name:this.color_name.trim(),
            hexa_name:'#'+this.hexa_name.trim()
        }
        this.$store.dispatch('Add_Color',{data:JSON.stringify(new_color)}).then(res=>{
            if(res==201)
            {
                this.$store.dispatch('Get_all_colors')
                this.hexa_name=""    
                this.color_name=""
                
            }
        })
    }

}
    }

}
</script>

<style lang="scss" scoped>
.container{
    color:white
}
.colorpic{
    margin-top: 10px;
}
#input-group-3{
    margin-top: 40px;
}


</style>