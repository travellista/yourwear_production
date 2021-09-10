import axios from 'axios'
import serverhost from '../../globalenv.js'
import cipher from '@/assets/js/enc-dec.js'

export default {

  
  async get_cart_list({ commit }) {
    var user=localStorage.getItem('currentuser')
    if( user === null)
    {return}
     user = JSON.parse(cipher.aesDecrypt(localStorage.getItem('currentuser')));
    

    var result;
    
    await axios
      .get(serverhost.server_host +'/cart/Getcart?id='+user.id)
      .then(res => {
        result = res.status
        commit("set_cartlist", res.data)
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  },
  async update_cart_list(_,{data}) {
    

    var result;
    console.log(data)
    await axios
      .put(serverhost.server_host +'/cart/Putcart',JSON.parse(data))
      .then(res => {
        result = res.status
    
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  },
  async delete_from_cart_list(_,{data}) {
    

    var result;
    console.log(data)
    await axios
      .delete(serverhost.server_host +'/cart/Deletecart',{ data: JSON.parse(data)})
      .then(res => {
        result = res.status
    
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  }
,
  async get_available_sizes({commit},cloth) {
    

    var result;
    console.log(cloth.color_id)
    await axios
      .get(serverhost.server_host +'/customclothes/Getitem_details_sizes?code='+cloth.id+'&&color_id='+cloth.color_id)
      .then(res => {
        if(res.status == 200)
        {commit('set_available_sizes',res.data)
      result=res.status
      }
    
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  },
  async Add_to_cart(_, { data }) {
    // debugger;
    var result;
    await axios
      .post(serverhost.server_host + "/custom/Addcart", JSON.parse(data))
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
