<template>

  <div >
    <div class="body"></div>
    <b-container fluid="lg" class="container_signup">
      <b-form @submit="onSubmit">
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-2"
              label="Your Name"
              label-for="input-2"
              class=""
            >
              <b-form-input
                id="input-2"
                v-model="getusers.name"
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
                v-model="getusers.user.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col>
            <b-form-group
              id="input-group-3"
              label="UserName"
              label-for="input-3"
              class="mb-2 mr-sm-2 mb-sm-0"
            >
              <b-form-input
                id="input-2"
                v-model="getusers.user.username"
                placeholder="Enter Username"
                required
                :state="username_validation"
              ></b-form-input>
              <b-form-invalid-feedback :state="username_validation">
                Your username must be > 6 charachters
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group
              id="input-group-2"
              label="Your Password"
              label-for="input-2"
              class=""
            >
              <b-form-input
                id="input-2"
                type="password"
                v-model="getusers.user.password"
                placeholder="Enter password"
                required
                :state="password_validation"
              ></b-form-input>
              <b-form-invalid-feedback :state="password_validation" >
                Your password must be > 5 charachters
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="input-group-2"
              label="Password Again"
              label-for="input-2"
              class=""
            >
              <b-form-input
                id="input-2"
                type="password"
                v-model="confirm_password"
                placeholder="Enter Password again"
                required
                :state="password_confirmation_validation"
              ></b-form-input>
              <b-form-invalid-feedback
                :state="password_confirmation_validation"
              >
                Your password doesnt match
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Address"
              label-for="input-3"
            >
              <b-form-input
                id="input-2"
                v-model="getusers.address"
                placeholder="Enter Address"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Phone"
              label-for="input-3"
              description="We'll never share your phone no with anyone else."
            >
              <b-form-input
                id="input-2"
                v-model="getusers.phone"
                placeholder="Enter PhoneNo"
              ></b-form-input>
            </b-form-group>
                    <b-button type="submit" variant="primary">Submit</b-button>

          </b-col>
        </b-row>

      </b-form>
      <h2 class="m-0 warningmsg">{{ error_message }}</h2>
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      getusers: {
        name: "",
        address: "",
        phone: "",
        user: {
          username: "",
          email: "",
          is_admin: 0,
          password: "",
        },
      },
      confirm_password: "",
      error_message:""
    };

  },
  computed: {
    ...mapGetters(["getuser", "update_message"]),
    username_validation() {
      return this.getusers.user.username.length > 5;
    },
    password_validation() {
      return this.getusers.user.password.length > 5;
    },
    password_confirmation_validation() {
      return this.getusers.user.password == this.confirm_password;
    },
  },
 
  methods: {
    ...mapMutations(["set_update_message"]),

    onSubmit(event) {
      event.preventDefault();

      this.$store.dispatch("Signup", { data: JSON.stringify(this.getusers) }).then(

          res=>{
              if(res.status == 201)
              {
                  this.$router.push({name:'Home'})
              }
              else if  (res.status == 409){
                  
                  this.error_message='username has been taken'
              }
              else if  (res.status == 410){
                  this.error_message='email has been taken'
              }
          }
      );
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.set_update_message("");

    next();
  },
};
</script>
<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  background: #fff;

  color: #fff;
  font-family: Arial;
  font-size: 12px;
}

.body {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -40px;
  bottom: -40px;
  width: auto;
  height: auto;
  /* background-image: url(http://ginva.com/wp-content/uploads/2012/07/city-skyline-wallpapers-008.jpg); */
  background-image: url(https://c.pshere.com/photos/30/a0/assorted_blurred_background_boutique_business_close_up_clothes_clothes_hanger_clothing-1000427.jpg!d);
  background-size: cover;
  // -webkit-filter: blur(2px);
  z-index: 0;
}


.warningmsg {
  color: rgb(228, 199, 11);
}
.container_signup{
  color:white
}
</style>