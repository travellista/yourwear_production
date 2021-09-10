<template>
<div >
            <h6 class="price"> From {{value[0]}}</h6>
            <h6 class="price"> To {{value[1]}}</h6>

  <Slider v-model="value" :range="true" :min="0" :max="1000"  />
</div>
</template>

<script>
import Slider from 'primevue/slider';

export default {
    components:{
        Slider
    }
,
data() {
		return {
			value: [0,1000]
		}
	},
    methods:{
        
    }
    ,watch:{
         value: function() {
      this.$emit('get_price',this.value)
            }
    }
}
</script>

<style lang="scss" scoped>
h6{
color:black
}
</style>