// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
//
// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//
// ]
//
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })
//
// export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from "@/views/logInView";
import SignUpView from "@/views/signUpView";
import createPlaylistView from "@/views/playlist/createPlaylistView";
import getUser from "@/composables/getUser";
import playlistDetailsView from "@/views/playlist/playlistDetailsView";
import userPlaylistView from "@/views/playlist/userPlaylistView.vue";
const onlyLoginUserCanCreate = (to,from,next)=>{
  const {user} = getUser()
  if(user.value){
    next()
  }else{
    next({name:'logIn'})
  }
}

const onlyLogOutUserCan = (to,from,next)=>{
  const {user} = getUser()
  if(!user.value){
    next()
  }else{
    next({name:'home'})  }
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter:onlyLoginUserCanCreate,
  },
  {
    path:'/login',
    name:'logIn',
    component: LogInView,
    beforeEnter:onlyLogOutUserCan
  },
  {
    path:'/signup',
    name:'signUp',
    component: SignUpView,
    beforeEnter:onlyLogOutUserCan
  },
  {
    path:'/playlist/create',
    name:'createPlaylist',
    component: createPlaylistView,
    beforeEnter:onlyLoginUserCanCreate,
  },
  {
    path:'/playlist/:id',
    name:'playlistDetails',
    component:playlistDetailsView,
    beforeEnter:onlyLoginUserCanCreate,
    props:true,
  },
  {
    path:'/playlist/user',
    name:'userPlaylist',
    component:userPlaylistView,
    beforeEnter:onlyLoginUserCanCreate,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
