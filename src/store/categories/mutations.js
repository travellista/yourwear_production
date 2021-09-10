
export default {
 
  set_genders(state,genders){
    state.genders=genders
  },
  set_genders_types(state,gendertypes){
    state.genders_types=gendertypes

  },
  set_sizes:(state,sizes)=>{
     state.sizes=sizes
  },
  set_all_clothes_types:(state,data)=>{
    state.all_clothes_types=data
  }
}
