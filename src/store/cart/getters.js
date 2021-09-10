export default {
  get_cart_list: (state) => {
    return state.cart_list
  },
get_cart_totalprice:(state)=>
{
  var total_price=0
   state.cart_list.forEach((s)=>
    {
          
          total_price += parseInt(s.qty) *( parseInt(s.price) -(parseInt(s.price)*parseInt(s.discount)/100))
    }
    )
    return total_price
},
get_cart_count:(state)=>{
  var count=0
  state.cart_list.forEach((s)=>
   {
         
         count += parseInt(s.qty) 
   }
   )
   return count
},
get_available_sizes:(state)=>{
  return state.available_sizes
}

}
