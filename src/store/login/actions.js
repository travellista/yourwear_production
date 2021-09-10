import axios from 'axios'
import serverhost from '../../globalenv.js'
import cipher from '@/assets/js/enc-dec.js'


export default {

  async Login({ commit }, { data }) {
    // const headers = {
    //   "Access-Control-Allow-Origin": "*"
      
    // }
    axios.defaults.headers = {
      "access-control-allow-origin": "*"
  }
    // let axiosConfig = {
    //   headers: {
    //       'Content-Type': 'application/json;charset=UTF-8',
          
    //   }
    // };
    var result;
    await axios
      .post(serverhost.server_host + '/users/Getuser', JSON.parse(data))
      .then(res => {
        result = {status:res.status,admin:res.data.user.is_admin}
        commit("SAVE_MESSAGE", res.status)
        commit("setuser", res.data)
console.log(res)
        var currentuser = res.data
        currentuser = { name: currentuser.name, id: currentuser.id ,admin:currentuser.user.is_admin}
        
        localStorage.setItem("currentuser", cipher.aesEncrypt(JSON.stringify(currentuser)));
        // localStorage.setItem("currentuser", JSON.stringify(currentuser));
        commit("isauthorized", true)
      })
      .catch(err => {
        console.log(err);
        result = err.response
        commit("SAVE_MESSAGE", err.response)
        commit("isauthorized", false)
      });
    return result;
  }

  ,
  async Signup({ commit }, { data }) {
    var result;
    await axios
      .post(serverhost.server_host + "/customers/Postcustomer", JSON.parse(data))
      .then(res => {
        result=res
        console.log(res)
        if (res.status == 201) {
          result = res
          commit("setuser",res.data)
          commit("isauthorized", true)
        }

        
        
        
      })
      .catch(err => {
        result = err.response
      });
    return result;
  }
  , async Login_Localstorage({ commit }) {
    var user=localStorage.getItem('currentuser')
    var result
    if( user === null)
    {return}
     user = JSON.parse(cipher.aesDecrypt(localStorage.getItem('currentuser')));

    await axios
      .get(serverhost.server_host + '/customers/Getcustomer/' + user.id)
      .then(res => {
        commit("setuser", res.data)
        commit("isauthorized", true)
        result=true
      })
      .catch(err => {

        commit("SAVE_MESSAGE", err.response.status)
        commit("isauthorized", false)
        result=false
      });
      return result
  },
  async Change_profile_data({commit}, { data }) {
    // debugger;
    var result
    var datajson = JSON.parse(data)

      await axios
      .put(serverhost.server_host + "/customers/Putcustomer/" + datajson.id, JSON.parse(data))
      .then(res => {
              
                  if (res.status == 202) {
                  axios.put(serverhost.server_host + "/users/Putuser/" + datajson.id, datajson.user).then(res2 =>
             {
              
              if (res2.status == 202) 
            {
              console.log(res)
              commit('set_update_message','Profile Updated')
              
            }
          }
          ).catch(err2 => {
            commit('set_update_message',err2.response.data.Message)
            
          })
        }





      })
      .catch(err => {
        console.log(err.response)
        
        result = err.response.status
      });
    return result
  }
}
