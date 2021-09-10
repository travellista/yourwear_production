<template>
  <div>
    <b-card no-body class="overflow-hidden" style="max-width: 100%">
      <b-row no-gutters>
        <b-col md="4">
          <b-card-img
            :src="
              require('!!url-loader?limit=0!../../../assets/' +
                get_chosen_product_item_details.code +
                '_' +
                get_chosen_product_item_details.colorname +
                '.jpg')
            "
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="8">
          <b-card-body>
            <b-card-text>
              <h1>{{ get_chosen_product_item_details.name }}</h1>
              <p>{{ get_chosen_product_item_details.description }}</p>
              <div class="pricelist">
                <div>
                  {{ get_chosen_product_item_details.price }} <span>EGP</span>
                </div>
                <div>
                  {{
                    get_chosen_product_item_details.price -
                    (get_chosen_product_item_details.price *
                      get_chosen_product_item_details.discount) /
                      100
                  }}
                  <span>EGP</span>
                </div>
              </div>
              <div class="colorshop">
                <div class="colorcontainer">
                  Available Colors:
                  <div
                    v-for="item in get_product_item_details"
                    :key="item.colorid"
                    v-bind:style="{ backgroundColor: item.hexacolor }"
                    @click="choose_product_item(item.colorid)"
                  ></div>
                </div>
                <div  class="shopicons">
                  <!-- v-if="wishlist" -->
                  <b-icon-heart-fill
                    variant="danger"
                    class="h1 mb-4"
                    v-if="get_chosen_product_item_details.wish"
                  @click="addtowishlist"></b-icon-heart-fill>
                  <b-icon-heart
                    variant="danger"
                    class="h1 mb-4"
                    @click="addtowishlist"
                    v-else
                  ></b-icon-heart>
                  <b-icon-cart4
                    variant="warning"
                    class="h1 mb-4 carticon"

                    v-if="get_chosen_product_item_details.qty > 0"
                    @click="choose_size"
                  ></b-icon-cart4>
                </div>
              </div>
            </b-card-text>
          </b-card-body>
          <b-card-footer v-if="get_chosen_product_item_details.qty == 0">
            <span class="outofstock">out of stock</span>
          </b-card-footer>
        </b-col>
      </b-row>
    </b-card>
    <warning :modalShow="modalShow" ref="login-modal"/>
    <sizecart :modalShow="sizeShow" :product="get_chosen_product_item_details"
    :code="get_chosen_product_item_details.code"
    :color="get_chosen_product_item_details.colorid"
     ref="size-modal"/>
  </div>
</template>

<script>
import warning from './loginwarning.vue'
import sizecart from '../Shared/size_choose.vue'
import { mapGetters, mapMutations } from "vuex";
export default {
  components:{
    warning,
    sizecart
  },
  data() {
    return {
      wishlist: true,
      modalShow:false,
      sizeShow:false,
    };
  },
  computed: {
    ...mapGetters([
      "get_product_item_details",
      "get_chosen_product_item_details",
      "getuser",
      "getwishes",
      "isauthorized",
    ]),
  },
  methods: {
    ...mapMutations([
      "choose_product_item",
      "set_chosen_product_item_details",
      "set_product_item_details_wish",
    ]),
    toast( toaster,color,append = false) {
        this.counter++
        this.$bvToast.toast(toaster, {
          
          toaster: 'b-toaster-top-right',
          variant:color,
          solid: true,
          appendToast: append
        })
      },
    choose_size(){
 if (!this.isauthorized) { 
   this.$refs['login-modal'].show_login_form()

 }
 else
{


      var obj={id:this.get_chosen_product_item_details.code,
      color_id: this.get_chosen_product_item_details.colorid}
      this.$store
            .dispatch("get_available_sizes",  obj ).then(
              res=>{
                console.log(res)
                if(res==200)
                {this.$refs['size-modal'].show_cart_size_form()}
              }
            )

    }},
    addtowishlist() {
      var wishlist = {
        customer_id: this.getuser.id,
        code: this.get_chosen_product_item_details.code,
        color_id: this.get_chosen_product_item_details.colorid,
      };
      if (this.isauthorized) {


        if (this.get_chosen_product_item_details.wish) 
        {
          this.$store
            .dispatch("Deletewishing_list", { data: JSON.stringify(wishlist) })
            .then((res) => {
              if (res == 200) {
                this.$store.dispatch("get_wish_list");
                this.set_product_item_details_wish(false);
                this.toast('successful removed wishlist','success')
                this.wishlist = !this.wishlist;
              }
            });
        } else {
          this.$store
            .dispatch("add_to_wishinglist", { data: JSON.stringify(wishlist) })
            .then((res) => {
              if (res == 201) {
                this.$store.dispatch("get_wish_list");
                this.set_product_item_details_wish(true);
                this.toast('successful added to wishlist','success')
                
              }
            });
        }
      } else {
this.$refs['login-modal'].show_login_form()
}

    },
  },
  beforeCreate() {
    
    this.$store.dispatch('get_wish_list')

  }
  
  
  
};
</script>

<style  scoped>
h1 {
  font-family: "Viaoda Libre", cursive;
  text-align: left;
  font-weight: bold;
}
.card-img-left {
  border-radius: 10%;
}

.colorcontainer {
  display: flex;
  font-weight: bold;
}

.colorcontainer div {
  margin: 0.5px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
}
.colorcontainer div:hover {
  cursor: pointer;
}
.pricelist {
  display: flex;
}
.pricelist div {
  font-size: 36px;
  font-family: "Viaoda Libre", cursive;
}
.pricelist div:first-child {
  text-decoration: line-through;
  color: red;

  margin: 0px 15px 0px 15px;
}
.shopicons {
  display: flex;
}
.b-icon.bi {
  margin-left: 15px;
}
.colorshop {
  display: flex;
  justify-content: space-between;
  padding-top: 10%;
}
.outofstock {
  font-weight: bold;
  color: red;
  font-size: 26px;
  font-family: "Viaoda Libre", cursive;
}
.carticon:hover{
  cursor: pointer;
  transform: scale(1.5);
}
</style>