
export default {
 
       set_all_colors(state,colors)
      {
       state.all_colors=colors
        
      },
      
      set_all_colors_filtered(state,colors)
      {
       state.all_colors_filtered=colors
        
      },

search_colors(state, text) {
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
