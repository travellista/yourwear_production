<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand>YourWear</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="gotohome">Home</b-nav-item>
          <b-nav-item-dropdown text="Categories" right>
            <b-dropdown-item
              v-for="category in getgenders"
              :key="category.id"
              @click="gender_type(category.id)"
              >{{ category.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item @click="gotoaboutus">About Us</b-nav-item>
          <b-nav-item href="#">Contact Us</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <div v-show="isauthorized">
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                variant="warning"
                @click="gotocart"
              >
                <span>cartitems</span>
                <b-icon-cart4></b-icon-cart4
              ></b-button>

              <b-button
                size="sm"
                class="my-2 my-sm-0"
                variant="danger"
                @click="gotowishlist"
              >
                <b-icon-heart-fill></b-icon-heart-fill
              ></b-button>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                variant="light"
                @click="gotomyorders"
              >
                <b-icon-journal></b-icon-journal>
                ></b-button
              >
            </div>
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
    gender_type(id) {
      this.$router.push({ name: "categories", params: { genderId: id } });
    },
    gotohome() {
      this.$router.push({ name: "Home" });
    },
    gotowishlist() {
      this.$router.push({ name: "wishinglist" });
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
  },
};
</script>

<style>
</style>