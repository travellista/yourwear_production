
export default {
 
       set_all_items(state,items)
      {
       state.all_items=items
        
      },
      
      set_all_items_filtered(state,id)
      {
          
       state.all_items_filtered=state.all_items.filter(s=>{
           return s.gender_id==id
       })
        
      },

search_items(state, text) {
             if(text=='')
             {
                   state.all_colors_filtered=state.all_colors
                   return
             }
                  text = text.toLowerCase();
                  state.all_colors_filtered = state.all_colors_filtered.filter(function (o) {
                      return ['hexa_name', 'name'].some(function (k) {
                          return o[k].toString().toLowerCase().indexOf(text) !== -1;
                      });
                  });
              }
      
  
}
