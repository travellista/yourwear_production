export default {
 get_requsted_orders:(state)=>{
return state.requsted_orders
 } ,
 get_filtred_orders:(state)=>(status)=>{
     if(status==5){
         return state.requsted_orders
     }
     else{

        return state.requsted_orders.filter(z=>
            z.is_confirmed==status
        )
     }

 }

}
