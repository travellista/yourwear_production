<template>
  <Knob v-model="value" :min="0" :max="100" />

</template>

<script>
import Knob from 'primevue/knob';

export default {
components:{
    Knob
},
data(){return{
  value:100
}}
,
watch:{
  value:function(){
this.$emit('discountvalue',this.value)

}
}
}
</script>

<style>

</style>