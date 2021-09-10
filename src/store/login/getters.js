export default {
  getuser: (state) => {
    return state.user
  },

  getinvoiceitems: (state) => {
    return state.invoiceitems
  },
  isauthorized: (state) => {
    return state.isauthorized
  }
,
login_message: (state) => {
  return state.login_message
},
signup_message: (state) => {
  return state.signup_message
},
update_message:(state)=>{
  return state.update_message
},
get_show_footer:(state)=>{
  return state.show_footer
}


}
