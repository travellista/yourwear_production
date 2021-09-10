<template>
  <div >
    <b-container fluid="lg">
  

    <b-form @submit="onSubmit" >
<b-row>
  <b-col>
      <b-form-group id="input-group-2" label="Your Name" label-for="input-2"  class="">
        <b-form-input
          id="input-2"
          v-model="getuser.name"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
</b-row>
<b-row>
  <b-col>
      <b-form-group
        id="input-group-1"
        label="Email"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="getuser.user.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>

  <b-col>

      <b-form-group id="input-group-3" label="UserName" label-for="input-3" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="input-2"
          v-model="getuser.user.username"
          placeholder="Enter Username"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
</b-row>
      <b-row>
        <b-col>
      <b-form-group id="input-group-3" label="Address" label-for="input-3">
        <b-form-input
          id="input-2"
          v-model="getuser.address"
          placeholder="Enter Address"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
</b-row>
    <b-row>
      <b-col>
      <b-form-group id="input-group-3" label="Phone" label-for="input-3" description="We'll never share your phone no with anyone else.">
        <b-form-input
          id="input-2"
          v-model="getuser.phone"
          placeholder="Enter PhoneNo"
          
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
      </b-row>
      
      <b-button type="submit" variant="primary">Submit</b-button>
      
    </b-form>
      <h2 class="m-0 warningmsg">{{ update_message }}</h2>

    </b-container>
    
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
          
        }
        ,result:'sss'
        
        
        
      }
    },
    computed:{
      ...mapGetters(['getuser','update_message'])

    },
     created(){
    if(localStorage.getItem('currentuser'))
    {
    this.$store.dispatch('Login_Localstorage')}
  },
    methods: {
      ...mapMutations(['set_update_message']),
      onSubmit(event) {
        event.preventDefault()

        this.$store.dispatch('Change_profile_data',{data:JSON.stringify(this.getuser)})
         
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    beforeRouteLeave (to,from,next) { 
      this.set_update_message('')
      
      next()

     }

  }
</script>
<style scoped>
.warningmsg{
  color:rgb(228, 199, 11)
}
</style>