<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>YourWear</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="gotohome">Home </b-nav-item>
          <b-nav-item @click="gotoitems">Items</b-nav-item>
          
          <b-nav-item @click="gotocolors">Colors</b-nav-item>
                    <b-nav-item @click="gotoclothestypes">CLOTHES TYPES</b-nav-item>


          
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
              <b-form-input
                  size="sm"
                  class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
          <b-nav-item-dropdown right v-show="!isauthorized">
            <template #button-content>
              <em>{{ getuser.name }}</em>
            </template>

            <b-dropdown-item @click="signin">Signin</b-dropdown-item>
            <b-dropdown-item @click="signup">SignUp</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right v-show="isauthorized">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ getuser.name }}</em>
            </template>

            <b-dropdown-item @click="userprofile">My Profile</b-dropdown-item>
            <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  created() {
    this.$store.dispatch("Get_Genders");
  },
  computed: {
    ...mapGetters(["getgenders", "isauthorized", "getuser"]),
  },
  methods: {
    signout() {
      this.$store.commit("isauthorized", false);
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    gotoitems() {
      this.$router.push({ name: "items"});
    },
    gotohome() {
      this.$router.push({ name: "adminhome" });
    },
    gotocolors() {
      this.$router.push({ name: "colorspicker" });
    },
    gotocart() {
      this.$router.push({ name: "cart" });
    },

    signin() {
      this.$router.push({ name: "login" });
    },

    signup() {
      this.$router.push({ name: "signup" });
    },
    userprofile() {
      this.$router.push({ name: "userprofile" });
    },
    gotomyorders() {
      this.$router.push({ name: "myorders" });
    },
    gotoaboutus() {
      this.$router.push({ name: "aboutus" });
    },
    gotoclothestypes(){
      this.$router.push({ name: "clothesgenderstypes" });
    }
  },
};
</script>

<style>
</style>