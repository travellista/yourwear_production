export default {
  get_product_item: (state) => {
    return state.product_item
  },
  // get_genders_types:(state)=>{
  //   return state.genders_types
  // }
  get_product_item_details:(state)=>{
    return state.product_item_details
  },
  



  get_chosen_product_item_details:(state)=>{
    
    
return state.product_item_details.find(s=>s.chosen==true)
  },
  get_product_newcollection:(state)=>{
    return state.product_newcollection
  },
  get_product_items_generic:(state)=>{
    return state.product_items_generic
  },
  
    get_product_items_generic_colors:(state)=>{
      return state.product_items_generic_colors
    }
   
     
}
