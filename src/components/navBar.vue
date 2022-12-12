<template>
  <div class="nav-bar">
      <nav>
         <router-link :to="{name:'home'}" >
           <h1 class="logo">
             <span>MUSO</span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="transparent" viewBox="0 0 24 24" stroke-width="1.5" stroke="pink" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
           </svg>
           </h1>
         </router-link>
          <div style="" class="btn-links-container">
            <div v-if="user" class="create-my-playlist-container">
                <router-link :to="{name:'userPlaylist'}">
                  <button class="nav-btn btn-myplaylist">my playlist</button>
                </router-link>
                <router-link :to="{name:'createPlaylist'}">
                  <button class="nav-btn">Create playlist </button>
                </router-link>

            </div>
            <div class="links-container">

              <!--          <svg   xmlns="http://www.w3.org/2000/svg" fill="#ffd424" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffd424" class="w-6 h-6">-->
              <!--            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />-->
              <!--          </svg>-->
              <div class="profile" @click="dropDown = !dropDown" v-if="user" >

                <img :src="user.photoURL" v-if="user.photoURL">
                <div v-if="!user.photoURL && user.displayName" class="profile-firstWordName">
                  <h2>{{user.displayName[0].toUpperCase()}}</h2>
                </div>
              </div>
              <div class="links" v-if="dropDown" @click="dropDown = false">
                <div>
                  <h3>{{user.displayName}}</h3>
                </div>
                <div v-if="!user">
                  <router-link :to="{name:'signUp'}">Sign up</router-link>
                </div>
                <div v-if="!user">
                  <router-link :to="{name:'logIn'}">Log in</router-link>
                </div>
                <div style="cursor: pointer;" @click="submitHandle" v-if="user">Log out</div>
              </div>

            </div>
          </div>
      </nav>
  </div>
</template>

<script>
import {ref,onMounted} from "vue";
import useLogout from "@/composables/useLogout";
import {useRouter} from  'vue-router';
import getUser from "@/composables/getUser";
import userPlaylistView from "@/views/playlist/userPlaylistView.vue";
export default {
  methods: {
    userPlaylistView() {
      return userPlaylistView
    }
  },
  props:['dropDown'],
  setup(){

    // const dropDown = ref(false)
    const router = useRouter()
    const {user} = getUser()
    const firstWordOfUserName = ref('')

    const {error,logout} = useLogout()
    const submitHandle = async ()=>{
        await logout()
      if(!error.value){
        console.log("user log out")
      }
      router.push({name:'logIn'})
    }
    return{submitHandle,user,firstWordOfUserName}
  }
}
</script>

<style scoped>
.logo{
  /*background-color: #464545;*/
  color:white;
  padding: 13px 15px;
  border-radius: 50%;
}
.logo span{
  color:white;
  font-weight: bold;
  text-shadow:
      0 0 7px #fff,
      0 0 10px #fff,
      0 0 60px #fff,
      0 0 30px #0fa,
      0 0 10px #0fa;
}

.nav-bar{
  padding:13px 16px;
  margin-bottom: 20px;
}
nav{
  display: flex;
  margin:0 auto;
  max-width: 1200px;
  justify-content: space-between;
  align-items: center;
}
svg{
    width:30px;
    height: 30px;
  }
.btn-myplaylist{
  margin-right: 8px;
}
.btn-links-container{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width:300px;
}
.links-container .profile{
  cursor: pointer;
}
.links-container{
  position: relative;
  margin-left: 10px;
}
.links{
  position: absolute;
  top:50px;
  left:10px;
  transform: translateX(-80px);
  width:max-content;
  padding: 10px 17px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 7px rgba(211, 211, 211, 0.22);
  z-index: 3;
}
.links div{
  margin-bottom:5px;
  font-weight: bold;
}
.profile{
  max-width: 50px;
  max-height: 50px;
  border-radius: 50%;
  background-color: white;
  overflow: hidden;
}
.profile .profile-firstWordName{
  width:50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile .profile-firstWordName h2{
  color:black
}
.profile img{
  width:100%;
  height: 100%;
}
button{
  color:white;
  padding: 10px;
}
</style>