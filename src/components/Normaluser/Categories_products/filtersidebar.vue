<template>
  <div class="cot">
    <b-button v-b-toggle.sidebar-variant
      ><b-icon-filter></b-icon-filter
    ></b-button>
    <b-sidebar
      id="sidebar-variant"
      title="Filter"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <div class="px-3 py-2">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="info"
                >Price
              </b-button>
              <b-form-checkbox
                id="checkbox-1"
                v-model="filtercheck.pricefilter"
                name="checkbox-1"
                value="1"
                unchecked-value="0"
                size="lg"
              ></b-form-checkbox>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              visible
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <pricefilter @get_price="get_price" />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="info"
                >Colors</b-button
              >
              <b-form-checkbox
                id="checkbox-2"
                v-model="filtercheck.colorfilter"
                name="checkbox-2"
                value="1"
                unchecked-value="0"
                size="lg"
              ></b-form-checkbox>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <colorfilter
                  v-for="id in get_product_items_generic_colors"
                  :key="id.colorid"
                  :colorid="id.colorid"
                  :hexacolor="id.hexacolor"
                  :colorname="id.colorname"
                  @colorenter="colorenter"
                  @removecolor="colorremove"
                />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="info"
                >Size</b-button
              >
              <b-form-checkbox
                id="checkbox-3"
                v-model="filtercheck.sizefilter"
                name="checkbox-3"
                value="1"
                unchecked-value="0"
                size="lg"
              ></b-form-checkbox>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <sizefilter
                  v-for="id in get_sizes"
                  :key="id.code"
                  :name="id.sizename"
                  :id="id.code"
                  @sizeenter="sizeenter"
                  @removesize="sizeremove"
                />
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="info"
                >discount</b-button
              >
              <b-form-checkbox
                id="checkbox-4"
                v-model="filtercheck.discountfilter"
                name="checkbox-4"
                value="1"
                unchecked-value="0"
                size="lg"
              ></b-form-checkbox>
            </b-card-header>
            <b-collapse
              id="accordion-3"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <discountfilter @discountvalue="get_discount" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
      <b-button block variant="warning" @click="filterproducts">
        <b-icon-funnel></b-icon-funnel>
        Apply Filter
      </b-button>
      <b-button block variant="warning" @click="cancelfilterproducts">
        Cancel Filter
      </b-button>
    </b-sidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pricefilter from "./filter_types/price_filter.vue";
import colorfilter from "./filter_types/color_filter.vue";
import sizefilter from "./filter_types/size_filter.vue";
import discountfilter from "./filter_types/discount_filter.vue";
export default {
  components: {
    pricefilter,
    colorfilter,
    sizefilter,
    discountfilter,
  },
  data() {
    return {
      filtercheck: {
        pricefilter: 0,
        colorfilter: 0,
        sizefilter: 0,
        discountfilter: 0,
      },
      price: [0, 1000],
      discount: 100,
      sizes: [],
      colors: [],
      filteredobject: {},
    };
  },
  computed: {
    ...mapGetters([
      "get_product_items_generic",
      "get_product_items_generic_colors",
      "get_sizes",
    ]),
  },
  methods: {
    get_price(price) {
      this.price = price;
    },
    get_discount(discount) {
      this.discount = discount;
    },
    sizeenter(sizeid) {
      this.sizes.push(sizeid);
    },
    sizeremove(sizeid) {
      this.sizes = this.sizes.filter(function (value) {
        return value !== sizeid;
      });
    },
    colorenter(colorid) {
      this.colors.push(colorid);
    },
    colorremove(colorid) {
      this.colors = this.colors.filter(function (value) {
        return value !== colorid;
      });
    },
    cancelfilterproducts(){ this.$emit('cancel_products_filter')},
    filterproducts() {
      if (this.filtercheck.pricefilter == 1) {
        this.filteredobject.pricemin = this.price[0];
        this.filteredobject.pricemax = this.price[1];
      } else {
        this.filteredobject.pricemin = 0;
        this.filteredobject.pricemax = 3000;
      }
      if (this.filtercheck.colorfilter == 1) {
        this.filteredobject.colorids = this.colors;
      } else {
        this.filteredobject.colorids = [];
        for (
          var i = 0, len = this.get_product_items_generic_colors.length;
          i < len;
          i++
        ) {
          this.filteredobject.colorids.push(
            this.get_product_items_generic_colors[i].colorid
          );
        }
      }
      if (this.filtercheck.discountfilter == 1) {
        this.filteredobject.discount = this.discount;
      } else {
        this.filteredobject.discount = 100;
      }
      if (this.filtercheck.sizefilter == 1) {
        this.filteredobject.sizeids = this.sizes;
      } else {
        this.filteredobject.sizeids = [];
        for (var ii = 0, leno = this.get_sizes.length; ii < leno; ii++) {
          this.filteredobject.sizeids.push(this.get_sizes[ii].code);
        }
      }
        this.$emit('update_products_shown',this.filteredobject)
    },
  },
};
</script>

<style scoped>
.cot {
  color: black;
  position: fixed;
  z-index: 1000;
}
</style>