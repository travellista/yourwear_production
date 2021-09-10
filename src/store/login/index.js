import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  drug_items: [{ id: 1, name: 'Panadol200' }, { id: 2, name: 'conges' }, { id: 3, name: 'scsa' }, { id: 4, name: 'zaas' }, { id: 4, name: 'Parace' }, { id: 5, name: 'Panadol500' }],
  msg: 0,
  alldrugs: [
    { code: '022', name: 'panadol extra', category: 'اقراص', quantity: '10', gomhor: '11', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'حبوب', darebasad: '23', reqqty: '' },
    { code: '032', name: 'flagyl', category: 'اقراص', quantity: '10', gomhor: '12', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'حبوب', darebasad: '23', reqqty: '' },
    { code: '042', name: 'HIN K 15ML DROPS. (---دلتا فارما---) SDJKSPP', category: 'شراب', quantity: '8', gomhor: '17', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'شراب', darebasad: '23', reqqty: '' },
    { code: '052', name: 'zaed', category: 'لبوس', quantity: '13', gomhor: '9', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'واحده', darebasad: '23', reqqty: '' },
    { code: '062', name: 'congestal', category: 'اقراص', quantity: '1', gomhor: '12', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'حبوب', darebasad: '23', reqqty: '' },
    { code: '072', name: 'paracetamol', category: 'كريم', quantity: '11', gomhor: '12', deserve: 'يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'كريم', darebasad: '23', reqqty: '' },
    { code: '082', name: 'salavo', category: 'اقراص', quantity: '10', gomhor: '12', deserve: 'لا يستحق', unit: 'شريط', sydly: '240', dareba: '0', damgha: '23', mwrd: 'pharma', type: 'حبوب', darebasad: '23', reqqty: '' }

  ],
  user: {},
  login_message:0,
  signup_message:{},
  isauthorized:false,
  update_message:'',
  show_footer:true
}

export default {
  
  state,
  getters,
  actions,
  mutations
}
