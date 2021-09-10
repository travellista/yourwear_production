import axios from 'axios'
import serverhost from '../../globalenv'

export default {

 async Get_Clothes_gender_cat({commit},gender_cat) {
   debugger;
        var result
         
          await axios
            .get(serverhost.server_host+"/customclothes/Getitem_details?gender_id="+gender_cat.genderid+"&&clothes_id="+gender_cat.clothid)
            .then(res => {
             if(res.status==200)
 {commit('set_product_items_generic',res.data)
 commit('set_product_items_generic_colors')
result=res.status}
              
}
              )
            .catch(err => {
             
                        result=err.response.status});
         return result    
        },
        

        
 async Get_product_details({commit},id) {
   var result
    await axios
      .get(serverhost.server_host+"/custom/Getitem_details?id="+id.id+"&&color_id="+id.color_id)
      .then(res => {
        if(res.status==200)
        {commit('set_product_item_details',res.data)
      
        result=res.status
      }      }

        )
      .catch(err => {
       console.log(err)
result=err.response.status                  });
       return result
  },
  async Get_product_newcollection({commit}) {
    // debugger;
     var result
      await axios
        .get(serverhost.server_host+"/custom/Getnewcollection")
        .then(res => {
          if(res.status==200)
          {commit('set_product_newcollection',res.data)
          result=res.status
        }      }
            
          )
        .catch(err => {
          result=err.response.status
         console.log(err)
                    });
                    return result
         
    }
    ,
    
 async Get_Clothes_gender_cat_filtered({commit},{gender_cat,filterobj}) {
  var result
  
   var filterdboj=JSON.parse(filterobj)
   
    await axios
      .post(serverhost.server_host+"/customclothes/Getitem_details_filtered?gender_id="+JSON.parse(gender_cat).genderid+"&&clothes_id="+JSON.parse(gender_cat).clothid,filterdboj.filterobject)
      .then(res => {
       if(res.status==200)
       console.log(res)
{commit('set_product_items_generic',res.data)
result=res.status}
        
}
        )
      .catch(err => {
       if(err.response.status==400)
         
                  result=err.response.status});
   return result    
  },

 
}
