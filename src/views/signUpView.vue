<template>
  <div>

    <form @submit.prevent="submitHandle" autocomplete="on" v-if="toShowSignUp">
      <h1>
        Sign up
      </h1>
      <input placeholder="User name" required type="text" v-model="displayName">
      <input placeholder="Email" required type="email" v-model="email">
      <input placeholder="Password" required type="password" v-model="password" @keydown="error=null">

      <div class="error" >{{error}}</div>
      <div class="loginBtn">
        <button class="btn" v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled><loadSpin/></button>
      </div>
      <strong>
        Already have an account? <router-link :to="{name:'logIn'}" style="text-decoration: underline">Log in</router-link>
      </strong>
    </form>
    <form v-if="toShowProfile" @submit.prevent="handleSubmitProfile">
        <div class="profile-container">
          <div class="profile-svg-container">
            <img src="../assets/icon/user.svg">
            <h2>Profile</h2>
          </div>
          <input type="file" @change="handleChooseProfile">
        </div>
        <div class="btn-container">
          <router-link :to="{name:'home'}" @click="location.reload()">
            <strong style="text-decoration: underline;color:rgba(142,143,142,0.91)" @click="location.reload()">skip</strong>
          </router-link>
          <button>Next</button>
        </div>
    </form>
  </div>
</template>

<script>
import {ref} from "vue";
import useSignup from "@/composables/useSignup";
import loadSpin from "@/components/loadSpin";
import useStorage from "@/composables/useStorage";
import getUser from "@/composables/getUser";
import {useRouter} from "vue-router";

export default {
  components:{
    loadSpin
  },
  setup(){
    const displayName = ref('')
    const email = ref('')
    const password = ref('')
    const file = ref(null)
    const errorFile = ref(null)
    const fileType = ref(["image/png","image/jpeg"])
    const resFromSignUp = ref({})
    const toShowProfile = ref(false)
    const toShowSignUp  = ref(true)
    const {error,signup,isPending} = useSignup()
    const {uploadImage} = useStorage()
    const {user} = getUser()
    const router = useRouter()
    const submitHandle = async ()=>{

       await signup(email.value,password.value,displayName.value)

      if(!error.value){
        toShowProfile.value = true
        toShowSignUp.value = false
        console.log('user sign up')
      }else{
        console.log('hello world')
        isPending.value = false
      }
    }

    const handleChooseProfile =  (e)=>{
      const selected = e.target.files[0]

      if(selected && fileType.value.includes(selected.type)){
        file.value = selected
        errorFile.value = null

      }else{
        file.value = null
        errorFile.value = "Please choose png or jpeg file type"
      }
    }

  const handleSubmitProfile = async ()=>{
        const {url,filePath,error} =await uploadImage(file.value,'profile')
        await user.value.updateProfile({photoURL:url.value})
    if(!error.value){
      location.reload()
      router.push({path:"/"})
    }
  }
    return{
      displayName,email,password,error,isPending,toShowSignUp,toShowProfile,
      submitHandle,handleChooseProfile,handleSubmitProfile
    }
  }

}
</script>

<style scoped>
h1{
  text-align: center;
}
.loginBtn{
  text-align: right;
}
.profile-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.profile-container img{
  width:180px;
  height: 180px;
  border-radius: 50%;
  background-color: rgba(211, 211, 211, 0.27);
}
.profile-container h2{
  text-align: center;
}

.btn-container{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

</style>