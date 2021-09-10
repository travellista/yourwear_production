import axios from 'axios'
import serverhost from '../../../globalenv'

export default {

 async Get_all_items({commit}) {
        var result
          await axios
            .get(serverhost.server_host+"/Clothes_items/GetallClothes_items")
            .then(res => {
              console.log(res+'amir')
             if(res.status==200)
 {commit('set_all_items',res.data)
 commit('set_all_items_filtered',1)
result=res.status}
              
}
              )
            .catch(err => {
             
                        result=err.response.status});
         return result    
        },
        async Add_New_item(_, { data }) {
          
          var result;
          await axios
            .post(serverhost.server_host + "/Clothes_items/PostClothes_items", JSON.parse(data))
            .then(res => {
      
                result = res.status
      
      
            })
            .catch(err => {
              console.log(err.response)
              result = err.response.status
            });
          return result;
        },
        async Delete_item(_,id) {
          console.log(id)
          var result;
          await axios
            .delete(serverhost.server_host + "/Clothes_items/DeleteClothes_items?id="+id)
            .then(res => {
      
                result = res.status
      
      
            })
            .catch(err => {
              console.log(err.response)
              result = err.response.status
            });
          return result;
        }
      }
        
 

