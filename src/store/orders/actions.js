import axios from 'axios'
import serverhost from '../../globalenv.js'

export default {

  
  async Confirm_order(_, { data }) {
    // debugger;
    var result;
    
    await axios
      .post(serverhost.server_host + "/orders/Postorder", JSON.parse(data))
      .then(res => {

          result = res.status


      })
      .catch(err => {
        result = err.response.status
      });
    return result;
  },
  async get_my_orders({commit},id) {
    // debugger;
    var result;
    
    await axios
      .get(serverhost.server_host + "/orders/Getorder?id="+id)
      .then(res => {
          console.log(res)
          result = res.status
          commit('set_requsted_orders',res.data)


      })
      .catch(err => {
        result = err.response.status
      });
    return result;
  },
  async get_all_orders({commit}) {
    // debugger;
    var result;
    
    await axios
      .get(serverhost.server_host + "/orders/GetordersAdmin")
      .then(res => {
          console.log(res)
          result = res.status
          commit('set_requsted_orders',res.data)


      })
      .catch(err => {
        result = err.response.status
      });
    return result;
  }
,
  async Cancel_order(_, { data }) {
    // debugger;
    var result;
    console.log(data)
    await axios
      .put(serverhost.server_host + "/orders/Putorder?id="+data.id,data)
      .then(res => {

          result = res.status


      })
      .catch(err => {
        result = err.response.status
      });
    return result;
  },


  async update_order_detail(_, { data }) {
    // debugger;
    var result;
    console.log(data)
    await axios
      .put(serverhost.server_host + "/orderdetails/Putorder_details?orderid="+data.order_id+"&code="+data.code+"&colorid="+data.color_id+"&sizeid="+data.size_id,data)
      .then(res => {

          result = res.status
          


      })
      .catch(err => {
        result = err.response.status
      });
    return result;
  },



}
