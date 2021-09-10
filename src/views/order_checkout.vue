<template>
  <div>
          <h1>Confirm Order</h1>

      <b-row>
          <b-col cols="6">
      <addresschoose />
      </b-col>
      <b-col cols="6">
      <invoice/>
      </b-col>
      </b-row>
  </div>
</template>

<script>
import addresschoose from '../components/Normaluser/orders/addresschoose.vue'
import invoice from '../components/Normaluser/orders/invoice.vue'
export default {
    components:{
        addresschoose,invoice
    }

}
</script>

<style>

</style>