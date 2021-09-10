import wish from '../whishlist/index'
export default {
 
  set_product_item: (state) => {
    return state.product_item
  },
  set_genders_types(state,gendertypes){
    state.genders_types=gendertypes

  },
  set_product_item_details(state,productitems){
    state.product_item_details=productitems
    for(var xx in state.product_item_details){
      state.product_item_details[xx].wish = false;
    }
    for (var ii in wish.state.whishlist) {
      for(var iii in state.product_item_details){
  if (state.product_item_details[iii].colorid == wish.state.whishlist[ii].color_id && state.product_item_details[iii].code == wish.state.whishlist[ii].code) {
    state.product_item_details[iii].wish = true;}
     else{
      continue
        }}
      }
   
      
  }
,
  choose_product_item(state,colorid){
    
    for (var i in state.product_item_details) {
      if (state.product_item_details[i].colorid == colorid) {
        state.product_item_details[i].chosen = true;}
         else{
          state.product_item_details[i].chosen = false;
            }
          }
  },
  set_product_newcollection(state,newcollection){
    state.product_newcollection=newcollection
  }
  ,
  set_product_items_generic(state,product_items){
    state.product_items_generic=product_items
  },
  set_product_items_generic_colors:(state)=>{
    state.product_items_generic_colors=[]
    
    for (var i = 0, len = state.product_items_generic.length; i < len; i++) {
      var check_orders = state.product_items_generic_colors.filter(getcolors => (getcolors.colorid == state.product_items_generic[i].colorid ));
      
      if(check_orders.length == 0)
        {
          state.product_items_generic_colors.push(state.product_items_generic[i])
        }

      

      }},

      set_product_item_details_wish(state,wish)
      {
        var i=state.product_item_details.findIndex(s=>s.chosen==true)
        state.product_item_details[i].wish=wish
        state.product_item_details[i].chosen=false
        state.product_item_details[i].chosen=true
       
        
      }
      
  
}
