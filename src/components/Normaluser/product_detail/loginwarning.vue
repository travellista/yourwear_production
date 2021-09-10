<template>
  <div>
    <b-modal v-model="modalShow" ref="my-modal">
      <div class="login" @keypress.enter="signin">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3" cols="12">
              <label :for="`type-text`">Username</label>
            </b-col>
            <b-col sm="9" cols="12">
              <b-form-input type="text" v-model="user"></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3" cols="12">
              <label :for="`type-text`">Password</label>
            </b-col>
            <b-col sm="9" cols="12">
              <b-form-input type="password" v-model="pass"></b-form-input>
            </b-col>
            <b-col cols="12">
              <b-alert variant="danger" :show="showwarn"
                >Invalid Username/Password</b-alert
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-button
                block
                variant="warning"
                class="loginbtn"
                @click="signin"
              >
                Login
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div>
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <b-button block variant="warning" @click="gotosignup">
                Sign Up
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pass: "",
      showwarn: false,
    };


  },
  props:{
          modalShow: {
               type: Boolean,
      default: false
          },

},
  methods: {
    gotosignup() {
      this.$router.push({ name: "signup" });
    },
    signin() {
      this.showwarn = false;
      var user = { username: this.user, email: this.user, password: this.pass };
      this.$store
        .dispatch("Login", { data: JSON.stringify(user) })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            this.modalShow = false;
          } else {
            this.showwarn = true;
          }
        });
    },
    show_login_form(){
         
        this.$refs['my-modal'].show()
      
    }
  },
};
</script>
<style scoped>
.loginbtn {
  margin-top: 10px;
}
.login {
  margin-bottom: 29px;
}
</style>