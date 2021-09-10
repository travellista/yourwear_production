<template>
  <div>
      <b-container fluid>
    <b-row>
      <b-col cols="3" class="sides">
        <insertcolor/>
      </b-col>
      <b-col cols="6">
        <div class="color_conatiner">
            <h1 v-if="get_all_colors_filtered.length == 0">No Colors Found</h1>
          <ColorCard
            v-for="id in get_all_colors_filtered"
            :key="id.id"
            :id="id.id"
            :hexa_name="id.hexa_name"
            :name="id.name"
          />
        </div>
      </b-col>
      <b-col cols="3" class="sides">
          <div >
              <ColorFilter/>
          </div>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
import insertcolor from './insert_color.vue'
import ColorFilter from "./color_filter.vue";
import ColorCard from "./color_card.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: {
    
    ColorCard,
    ColorFilter,
    insertcolor
  },
  data() {
    return {
      text: "",

      color: "11FFD2",
    };
  },
  computed: {
    ...mapGetters(["get_all_colors", "get_all_colors_filtered"]),
  },
  methods: {
    ...mapMutations(["search_colors"]),
  },
};
</script>

<style  scoped>
.sides{
    background-color: #35485e;
}
.color_conatiner{
    overflow: scroll;
}

</style>