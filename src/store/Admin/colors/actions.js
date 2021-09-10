import axios from 'axios'
import serverhost from '../../../globalenv'

export default {

 async Get_all_colors({commit}) {
        var result
         
          await axios
            .get(serverhost.server_host+"/colors/Getcolors")
            .then(res => {
             if(res.status==200)
 {commit('set_all_colors',res.data)
 commit('set_all_colors_filtered',res.data)
result=res.status}
              
}
              )
            .catch(err => {
             
                        result=err.response.status});
         return result    
        },
        async Add_Color(_, { data }) {
          
          var result;
          await axios
            .post(serverhost.server_host + "/colors/Postcolor", JSON.parse(data))
            .then(res => {
      
                result = res.status
      
      
            })
            .catch(err => {
              console.log(err.response)
              result = err.response.status
            });
          return result;
        },
        async Delete_Color(_,id) {
          
          var result;
          await axios
            .post(serverhost.server_host + "/colors/Deletecolor?id="+id)
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
        
 

