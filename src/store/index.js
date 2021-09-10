import Vue from 'vue'
import Vuex from 'vuex'
import login from './login/index'
import categories from './categories/index'
import products from './products/index'
import wishlist from './whishlist/index'
import cart from './cart/index'
import orders from './orders/index'
import colors from './Admin/colors/index'
import items from './Admin/items/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    
    login,
    categories,
    products,
    wishlist,
    cart,
    orders,
    colors,
    items
  }
})
