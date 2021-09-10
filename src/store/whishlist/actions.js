import axios from 'axios'
import serverhost from '../../globalenv.js'
import cipher from '@/assets/js/enc-dec.js'


export default {

  async add_to_wishinglist({ commit }, { data }) {

    var result;
    await axios
      .post(serverhost.server_host +'/wishinglist/Postwishing_list', JSON.parse(data))
      .then(res => {
        result = res.status
        commit("set_whishlist", res.data)
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  },
  async get_wish_list({ commit }) {
    
    if(localStorage.getItem('currentuser') === null)
    {result=305
      return result
    }
    var user = JSON.parse(cipher.aesDecrypt(localStorage.getItem('currentuser')));
    var result;
    
    
    await axios
      .get(serverhost.server_host +'/wishinglist/Getwishing_list?customer_id='+user.id)
      .then(res => {
        result = res.status
        commit("set_whishlist", res.data)
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  },
  async Deletewishing_list( _,{ data }) {

    var result;
    await axios
      .delete(serverhost.server_host +'/wishinglist/Deletewishing_list', { data: JSON.parse(data)})
      .then(res => {
        result = res.status
        
      })
      .catch(err => {
        console.log(err.response.status);
        result = err.response.status
        
      });
    return result;
  }


}
