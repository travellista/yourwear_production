
export default {
  SAVE_MESSAGE (state, status) {
    state.login_message=status
  },
  setuser (state, user) {
    // state.invoiceitems=state.invoiceitems.filter(e=>
    //     e.code !== drugitem.code)
    state.user = user
      
  },
  set_update_message(state,message){
    state.update_message=message
  },

  editinvoiceqty (state, drugitem) {
    var index = state.invoiceitems.findIndex(e => {
      return e.code === drugitem.code
    })

    state.invoiceitems[index].reqqty = drugitem.reqqty
  },
  isauthorized (state, check) {
    state.isauthorized = check
  },
  signup_message(state,message){
    state.signup_message=message
  },
  set_show_footer(state,show)
  {
    state.show_footer=show
  }
}
