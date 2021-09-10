import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: 'MainLayout',
    component: Home,
    meta: { title: 'YourWear', requiresAuth: 2 },
    children: [
      {
        path: '/categories/:genderId',
        name: 'categories',
        component: function () {
          return import('../views/Categories.vue')
        },
        meta: { title: 'Categories' }

      },
      {
        path: '/userprofile',
        name: 'userprofile',
        component: function () {
          return import('../components/Shared/userprofile/userprofile.vue')
        },
        meta: { title: 'MyProfile' }
      },
      {
        path: '/home',
        name: 'Home',
        component: function () {
          return import('../components/Normaluser/Home/newcollection')
        },
        meta: { title: 'YourWear' }
      },
      {
        path: '/productdetail',
        name: 'productdetail',
        component: function () {
          return import('../components/Normaluser/product_detail/product_detail')
        },
        meta: { title: 'product_detail' }
      },
      {
        path: '/Categories_products/:genderid/:clothid',
        name: 'catproduct',
        component: function () {
          return import('../views/Categories_products')
        },
        meta: { title: 'Categories_products' }
      },
      {
        path: '/wishing_list',
        name: 'wishinglist',
        component: function () {
          return import('../views/wishing_list')
        },
        meta: { title: 'wishinglist' },
        beforeEnter: (to, from, next) => {

          store.dispatch('get_wish_list').then(
            res => {
              if (res == 200) { next() }
              else if (res == 305) {
                next('/')
              }
            }
          )

        }
      },
      {
        path: '/cart',
        name: 'cart',
        component: function () {
          return import('../views/cart')
        },
        meta: { title: 'Mycart' }
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: function () {
          return import('../views/order_checkout')
        },
        meta: { title: 'CheckOut' }
      },
      {
        path: '/myorders',
        name: 'myorders',
        component: function () {
          return import('../views/order_status')
        },
        meta: { title: 'My Orders' }
      },
      {
        path: '/aboutus',
        name: 'aboutus',
        component: function () {
          return import('../views/about.vue')
        },
        meta: { title: 'About Us' }

      }


    ],
    beforeEnter: (to, from, next) => {
      if (!store.getters['isauthorized']) {

        store.dispatch('Login_Localstorage').then(
          res => {
            if (res) {
              if (store.getters['getuser'].user.is_admin == 1) {

                next('/adminhome')
              }
              else {
                store.dispatch('Get_product_newcollection').then(
                  res => {
                    if (res == 200) { next() }
                  }
                )

              }
            }
            else {
              store.dispatch('Get_product_newcollection').then(
                res => {
                  if (res == 200) { next() }
                }
              )
            }
          })
      }

      else {

        if (store.getters['getuser'].user.is_admin == 1) {
          console.log(store.getters['getuser'])
          next('/adminhome')
        }
        else {
          store.dispatch('Get_product_newcollection').then(
            res => {
              if (res == 200) { next() }
            }
          )

        }
      }

    }
  },




  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/Shared/Login/Login')
    }, beforeEnter: (to, from, next) => {

      store.commit('set_show_footer', false)

      next()
    },


    meta: { title: 'Login' }
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import('../components/Shared/Login/signup2')
    },
    beforeEnter: (to, from, next) => {

      store.commit('set_show_footer', false)
      next()
    },
    beforeRouteLeave: function (to, from, next) {

      store.commit('set_show_footer', true)

      next();
    },


    meta: { title: 'SignUp' }
  },

  {
    path: '/adminorders',
    name: 'adminorders',
    
    component: function () {
      return import('../views/Admin/Customer_Orders')
    },
    meta: { title: 'Customer Orders' }
  },
  //Admin views
  {
    path: '/adminhome',
    name: 'adminhome',
    redirect:'/allorders',
    component: function () {
      return import('../views/Admin/AdminHome')
    },
    meta: { title: 'Home' },
    children: [

      {
        path: '/allorders',
        name: 'admin',
        component: function () {
          return import('../components/Admin/orders/orderinvoice_lookup')
        },
        meta: { title: 'Orders' },
        beforeEnter: (to, from, next) => {

          store.dispatch('get_all_orders').then(
            res => {
              if (res == 200) { next() }
              else if (res == 305) {
                next('/')
              }
            }
          )

        }
      },


      {
        path: '/items',
        name: 'items',
        component: function () {
          return import('../views/Admin/items')
        },
        meta: { title: 'items' },
        beforeEnter: (to, from, next) => {

          
          store.dispatch("Get_Genders")
          .then(
            res=>{
              if(res==200)
              {

                  
                store.dispatch('Get_all_items').then(
                  reso=>{
                    if(reso == 200)
                    {
                      store.dispatch("Get_Sizes").then(resp=>{

                     if(resp==200)
                     {
                       
                      store.dispatch("Get_all_colors").then(
                        colorresp=>{
                          if(colorresp==200)
                          {next()}
                          else{next('/')}
                        }
                      )
                      
                      
                      
                     }
                     else{
                       next('/')
                     }
                      })
                      
                      
                      
                      }
                      else{
                        next('/')
                      }
                  }
                )

              }
              else {
                next('/')
              }
            }
          )
        }
      

      },
      {
        path: '/colorspicker',
        name: 'colorspicker',
        component: function () {
          return import('../components/Admin/colors/insert_colors')
        },
        meta: { title: 'pick colors' },
        beforeEnter: (to, from, next) => {
          store.dispatch('Get_all_colors').then(
            res=>{
              if(res==200)
              {

                  next()




              }
              else {
                next('/')
              }
            }
          )
        }
      },
      {
        path: '/genderTypes',
        name: 'clothesgenderstypes',
        component: function () {
          return import('../views/Admin/Gender_Types')
        },
        meta: { title: 'Gender Types' },
        beforeEnter: (to, from, next) => {
          store.dispatch('Get_Genders').then(
            res=>{
              if(res==200)
              {
                store.dispatch('GET_ALL_TYPES').then(resp=>{
                  if(resp==200){
                    next()
                  }
                  else{
                    next('/')
                  }
                })
                  




              }
              else {
                next('/')
              }
            }
          )
        }
      }
    ]
    ,
    beforeEnter: (to, from, next) => {

      if (!store.getters['isauthorized']) {
        store.dispatch('Login_Localstorage').then(
          res => {
            if (res) {
              if (store.getters['getuser'].user.is_admin == 1) {

                next()
              }
              else {
                next('/')
              }

            }
            else {
              next('/')
            }

          }

        )


      }
      else {

        if (store.getters['getuser'].user.is_admin == 1) {
          
          next()
        }
        else {
          
            
            next('/') 
          
          

        }}
      





    }

  },



]



const router = new VueRouter({
  mode: 'history',

  routes
})






router.beforeEach((to, from, next) => {
  if (from === to) {
    // handle any error due the redundant navigation here
    // or handle any other param modification and route afterwards
    return
  }
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }
  if (!store.getters['isauthorized']) { store.dispatch('Login_Localstorage') }

  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   // this route requires auth, check if logged in

  // console.log(store.getters['getuser'])

  //   if (store.getters['getuser'].admin==1) {
  //     next({
  //       path: '/adminhome',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next() // make sure to always call next()!
  // }




  next()
  // if(store.getters['isauthorized']){ //If there is, go directly to the homepage.
  //   next();
  // } else {
  //   if(to.path=='/login' || to.path=='/signup'){ //If it is the path of the login page, directly next()
  //       next();
  //   } else { //Otherwise jump to login;
  //       next('/login');
  //  } }

})

export default router
