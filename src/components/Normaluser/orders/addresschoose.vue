<template>
  <div class="container">
    <div>
      <b-button v-b-toggle.collapse-1 class="m-1">Edit Your Address</b-button>
      <b-collapse visible id="collapse-1">
        <b-card>
          <div>
            <b-form-textarea
              id="textarea"
              v-model="getuser.address"
              @focus="chooseaddress"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
        </b-card>
      </b-collapse>
    </div>

<div>
      <b-button v-b-toggle.collapse-2 class="m-3">Edit Your PhoneNo</b-button>
      <b-collapse visible id="collapse-2">
        <b-card>
          <div>
            <b-form-textarea
              id="textarea"
              v-model="getuser.phone"
              @focus="chooseaddress"
              rows="1"
              max-rows="1"
            ></b-form-textarea>
          </div>
        </b-card>
      </b-collapse>
    </div>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  
  computed: {
    ...mapGetters(["getuser"]),
  },
  methods: {
    chooseaddress() {
      console.log("ssda");
      this.addresscheck = !this.addresscheck;
    },
  },
};
</script>

<style scoped>
.container{
    text-align: left;
}
</style>

