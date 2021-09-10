<template>
  <div>
    <b-button v-b-modal.modal-xl ref="showmodalbtn" @click="openitemModal"
      >Add new item</b-button
    >


    <b-modal
      v-model="modalShow"
      hide-footer
      ref="product-main-modal"
      title="Add New Product"
      id="modal-xl"
      size="xl"
    >
      <div class="bigcontainer">
        <div class="main_item">
          <b-container fluid>
            <b-row class="my-1">
              <b-col sm="1" cols="1">
                <label><code>Code</code>:</label>
              </b-col>
              <b-col sm="5" cols="5">
                <b-form-input v-model="itemcode" trim></b-form-input>
              </b-col>
              <b-col sm="1" cols="1">
                <label><code>Name</code>:</label>
              </b-col>
              <b-col sm="5" cols="5">
                <b-form-input v-model="itemname" trim></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="3" cols="3">
                <label><code>Description</code>:</label>
              </b-col>
              <b-col sm="9" cols="9">
                <b-form-textarea
                  id="description"
                  rows="3"
                  max-rows="6"
                  v-model="itemdescription"
                ></b-form-textarea>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" cols="12">
                <b-dropdown
                  id="dropdown-1"
                  :text="mygender.name"
                  block
                  menu-class="w-100"
                  class="m-2"
                >
                  <b-dropdown-item
                    v-for="gender in getgenders"
                    :key="gender.id"
                    @click="getclothtypes(gender.id, gender.name)"
                    >{{ gender.name }}</b-dropdown-item
                  >
                </b-dropdown>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="12" cols="12">
                <b-dropdown
                  id="dropdown-2"
                  :text="ClothType.name"
                  block
                  menu-class="w-100"
                  class="m-2"
                >
                  <b-dropdown-item
                    v-for="type in get_genders_types"
                    :key="type.ClothesId"
                    @click="getcategorytype(type)"
                    >{{ type.ItemName }}</b-dropdown-item
                  >
                </b-dropdown>
              </b-col>
            </b-row>
          </b-container>
        </div>
        <div>
          <b-container fluid>
            <b-row class="header-title">
              <b-col cols="3">color</b-col>
              <b-col cols="2">size</b-col>

              <b-col cols="4">
                <b-row
                  ><b-col cols="6">Quantity</b-col>
                  <b-col cols="6">Discount</b-col>
                </b-row>
              </b-col>
              <b-col cols="3">price</b-col>
            </b-row>
            <div class="newitemdetails">
              <itemdetail
                v-for="(id, index) in itemdetails"
                :key="index"
                @item-detail-values="assignitem($event, index)"
                @remove-item="removeitem(index)"
              />
            </div>
            <b-button active variant="success" @click="addnewitem"
              >Add item</b-button
            >
          </b-container>
        </div>
      </div>
      <b-container fluid>
        <b-row>
          <b-col cols="9"><div></div></b-col>
          <b-col cols="3"
            ><div class="addcart">
              <b-button variant="danger" @click="modalShow = !modalShow"
                >Cancel</b-button
              >
              <b-button variant="success" @click="CHECK_INPUT_ITEMS"
                >Add New Product</b-button
              >
            </div></b-col
          >
        </b-row></b-container
      >
      {{get_genders_types}}
      {{ClothType}}
    </b-modal>
  </div>
</template>

<script>
import itemdetail from "./item_detail.vue";
import { mapGetters } from "vuex";
export default {
  components: { itemdetail },
  data() {
    return {
      file: "",
      itemdetails: [{ id: 0 }],

      mygender: { id: 0, name: "Gender" },
      itemcode:"",
      itemname:"",
      itemdescription:"",
      
      
      ClothType: { id: 0, name: "Category" },
      itemvalues: [],
      
      modalShow: false,
      types: [
        { text: "text", label: "code", cols: "3" },
        { text: "text", label: "name", cols: "3" },
        { text: "text", label: "price", cols: "3" },
        { text: "text", label: "description", cols: "3" },
        { text: "text", label: "gender", cols: "3" },
        { text: "text", label: "cloth_type", cols: "3" },
        { text: "text", label: "color", cols: "3" },
        { text: "text", label: "size", cols: "3" },
        { text: "text", label: "price", cols: "3" },
        { text: "text", label: "discount", cols: "3" },
      ],
    };
  },
  props:{
productinfo:Array,
//0 for insert new
//1 for update
openmode:{
  type:Number,
  default:0

}
},
  computed: {
    ...mapGetters(["getgenders", "get_genders_types", "get_sizes"]),
  },
  methods: {
    toast(toaster, color, append = false) {
      this.counter++;
      this.$bvToast.toast(toaster, {
        toaster: "b-toaster-top-right",
        variant: color,
        solid: true,
        appendToast: append,
      });
    },

    getcategorytype(type) {
      this.ClothType.name = type.ItemName;
      this.ClothType.id = type.ClothesId;
    },

    getclothtypes(id, name) {
      
      this.mygender.name = name;
      this.mygender.id = id;
      this.$store.dispatch("Get_Genders_Types", id);
    },
    addnewitem() {
      this.itemdetails.push({ id: 0 });
    },
    removeitem(index) {
      var i = this.itemvalues.findIndex((x) => {
        return x.index == index;
      });
      for (var x = i + 1; x < this.itemvalues.length; x++) {
        this.itemvalues[x].index -= 1;
      }
      this.itemvalues.splice(i, 1);
    },





    assignitem(item, index) {
      item.index = index;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = mm + "-" + dd + "-" + yyyy;
      item.data_added = today;

      var i = this.itemvalues.findIndex((x) => {
        return x.index == index;
      });

      if (i == -1) {
        this.itemvalues.push(item);
      } else {
        this.itemvalues.splice(i, 1);
        this.itemvalues.push(item);
      }
    },

    CHECK_INPUT_ITEMS(){
         if(this.itemname =='')
        {this.toast('check product name','danger')
          return false}
        else if(this.itemcode =='')
        {this.toast('check product code','danger')
        return false}
        else if(this.itemdescription =='')
        {this.toast('check product description','danger')
        return false}
        else if(this.mygender.id ==0)
        {this.toast('check product gender','danger')
        return false}
        else if(this.ClothType.id ==0)
        {this.toast('check product category','danger')
        return false}
       if ((this.itemvalues.findIndex(item=>{
          return item.price=='' || item.price==0 
        })) !== -1)
        {this.toast('check product price','danger')
        return false}
        else if ((this.itemvalues.findIndex(item=>{
          return item.qty=='' || item.qty==0 
        })) !== -1)
        {this.toast('check product Quantity','danger')
        return false}
        else if ((this.itemvalues.findIndex(item=>{
          return item.color_id==0
        })) !== -1)
        {this.toast('check product colors','danger')
        return false}
        else if ((this.itemvalues.findIndex(item=>{
          return item.size_id==0
        })) !== -1)
        {this.toast('check product sizes','danger')
        return false}

        else {
        this.add_new_product() }
        

    }
,





    add_new_product() {
      var new_product = {
        code: this.itemcode,
        name: this.itemname,
        description: this.itemdescription,
        price: "0",
        gender_id: this.mygender.id,
        clothes_id: this.ClothType.id,
        item_details: this.itemvalues,
      };
      console.log(new_product);
      this.$store
        .dispatch("Add_New_item", { data: JSON.stringify(new_product) })
        .then((res) => {
          console.log(res);
          if (res == 201) {
            this.$store.dispatch("Get_all_items").then((reso) => {
              if (reso == 200) {
                this.modalShow = !this.modalShow;
              }
            });
          } else {
            console.log("invalid");
          }
        });
    },
    openitemModal(){
      this.modalShow = !this.modalShow 
      
      if(this.openmode==1)
      {
        this.itemname=this.productinfo[0].name
        this.itemcode=this.productinfo[0].code
        this.itemdescription=this.productinfo[0].description
        this.mygender.id=this.productinfo[0].gender_id
        this.mygender=this.getgenders.filter(x=>{
          return x.id==this.productinfo[0].gender_id
        })[0]
        this.getclothtypes(this.mygender.id, this.mygender.name)

        
        
      }
     
    }
  },
  watch:{
        get_genders_types:function(){
          if(this.openmode==1){
  var clothtypevar=this.get_genders_types.filter(x=>{
          return x.ClothesId==this.productinfo[0].clothes_id
        })[0]
      
         
        console.log(this.clothtypevar)
        this.ClothType.name=clothtypevar.ItemName
        this.ClothType.id=clothtypevar.ClothesId
        this.openmode=0
          }
        //console.log(this.ClothType)
        }}
};
</script>

<style  scoped>
.bigcontainer {
  display: flex;
  justify-content: space-evenly;
}
.main_item {
  border-right: black solid;
}
.header-title {
  text-align: center;
}
</style>