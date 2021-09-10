import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  product_item:{},
  genders_types:{},
  product_item_details:[{}],
  product_newcollection:[{}],
  product_items_generic:[{}],
  product_items_generic_colors:[{}]
  

}

export default {
  
  state,
  getters,
  actions,
  mutations
}
