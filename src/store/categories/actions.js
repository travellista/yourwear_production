import axios from 'axios'
import serverhost from '../../globalenv'

export default {

 async Get_Genders({commit}) {
        
         var result
          await axios
            .get(serverhost.server_host+"/clothesgenders/Getclothesgender")
            .then(res => {
              result=res.status
             if(res.status==200)
 {
   commit('set_genders',res.data)}}
              )
            .catch(err => {
              result=err.response
             console.log(err)
                        });
                        return result
             
        },
        async Get_Genders_Types({commit},gender) {
          // debugger;
           
            await axios
              .get(serverhost.server_host+"/clothes_types_genders/Getclothes_types_genders/"+gender)
              .then(res => {
              if(res.status==200)
              { 
                commit('set_genders_types',res.data)}
              }
                )
              .catch(err => {
               console.log(err)
                          });
               
          },
          async Get_Sizes({commit}) {
            var result
             
              await axios
                .get(serverhost.server_host+"/sizes/Getsize_details")
                .then(res => {
                if(res.status==200)
                { result=res.status
                  commit('set_sizes',res.data)}
                }
                  )
                .catch(err => {
                  result=err.response.status
                 console.log(err)
                            });
                 return result
            },

            async ADD_NEW_GENDER(_,data) {
              var result
               
                await axios
                  .post(serverhost.server_host+"clothesgenders/Postclothes_gender",JSON.parse(data))
                  .then(res => {
                  if(res.status==201)
                  { result=res.status
                    }
                  }
                    )
                  .catch(err => {
                    result=err.response.status
                   console.log(err)
                              });
                   return result
              }
   
 ,
              async DELETE_GENDER(_,data) {
                var result
                 
                  await axios
                    .delete(serverhost.server_host+"clothesgenders/Deleteclothes_gender?id="+data)
                    .then(res => {
                      
                    if(res.status==200)
                    { result=res.status
                      }
                    }
                      )
                    .catch(err => {
                      result=err.response.status
                     console.log(err)
                                });
                     return result
                }
     ,
    //  async ADD_NEW_TYPE(_,data) {
    //   var result
       
    //     await axios
    //       .post(serverhost.server_host+"clothes_types/Postclothes_types",JSON.parse(data))
    //       .then(res => {
    //       if(res.status==201)
    //       { result=res.status
    //         }
    //       }
    //         )
    //       .catch(err => {
    //         result=err.response.status
    //        console.log(err)
    //                   });
    //        return result
    //   }
      
      async GET_ALL_TYPES({commit}) {
       var result
        
         await axios
           .get(serverhost.server_host+"clothes_types/Getclothes_types")
           .then(res => {
             
           if(res.status==200)
           {result=res.status
             commit("set_all_clothes_types",res.data)
           }
           }
             )
           .catch(err => {
             result=err.response.status
            console.log(err)
                       });
            return result
       }
       ,
       async ADD_NEW_TYPE(_,data) {
        var result
         
          await axios
            .post(serverhost.server_host+"clothes_types/Postclothes_types",JSON.parse(data))
            .then(res => {
            if(res.status==201)
            { result=res.status
              }
            }
              )
            .catch(err => {
              result=err.response.status
             console.log(err)
                        });
             return result
        },
        async DELETE_TYPE(_,data) {
          var result
           
            await axios
              .delete(serverhost.server_host+"clothes_types/Deleteclothes_types?id="+data)
              .then(res => {
                
              if(res.status==200)
              { result=res.status
                }
              }
                )
              .catch(err => {
                result=err.response.status
               console.log(err)
                          });
               return result
          }

          ,async ADD_NEW_GENDER_TYPE(_,data) {
            var result
             
              await axios
                .post(serverhost.server_host+"clothes_types_genders/Postclothes_types_genders",JSON.parse(data))
                .then(res => {
                if(res.status==201)
                { result=res.status
                  }
                }
                  )
                .catch(err => {
                  result=err.response.status
                 console.log(err)
                            });
                 return result
            },
            async DELETE_NEW_GENDER_TYPE(_,data) {
              var result
               
                await axios
                  .delete(serverhost.server_host+"clothes_types_genders/Deleteclothes_types_genders?clothes_id="+data.ClothesId+"&gender_id="+data.genderID)
                  .then(res => {
                   
                  if(res.status==200)
                  { result=res.status
                    }
                  }
                    )
                  .catch(err => {
                    result=err.response.status
                   console.log(err)
                              });
                   return result
              },

}
