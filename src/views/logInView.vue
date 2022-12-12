<template>
  <div>

      <form @submit.prevent="submitHandle" autocomplete="on">

        <h1>
          Login
        </h1>
          <input placeholder="Email" required type="email" v-model="email">
          <input placeholder="Password" required type="password" v-model="password" @keydown="error=null">
          <div class="error" >{{error}}</div>
        <div class="loginBtn-container">
          <div class="loginBtn">
            <button class="btn" v-if="!isPending">Log in</button>
            <button v-if="isPending" disabled class="btn" style="display: flex;justify-content: center"><loadSpin/></button>
          </div>
          <h4>Or</h4>
          <div class="loginWithGoogle" @click="handleLogInWithGoogle">
            <button  class="btn" style="display: flex; justify-content: center">
                <div style="display:flex; align-items: center; ">
                  <img src="../assets/icon/google.svg" alt="" class="google-icon">

                </div>
              Log in with google

            </button>

          </div>
        </div>


        <strong>
          No account yet? <router-link :to="{name:'signUp'}" style="text-decoration: underline; text-align: center">Sign up</router-link>

        </strong>
      </form>

  </div>
</template>

<script>
import loadSpin from "@/components/loadSpin";
import useLogin from "@/composables/useLogin";
import {ref} from "vue";
import useSignInWithGoogle from "@/composables/useSignInWithGoogle";
import {useRouter} from "vue-router";
export default {
  components:{loadSpin},
  setup(){
    const {error,login, isPending} = useLogin()
    const {errorGoogle,googleLogIn} = useSignInWithGoogle()
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const submitHandle = async ()=>{
      const res = await login(email.value,password.value)
      if(!error.value){
        console.log('user logged in')
        router.push({path:'/'})
      }else{
        isPending.value = false
      }
    }

    const handleLogInWithGoogle = async ()=>{
        await googleLogIn();
        router.push({path:'/'})
    }
    return{
      error, email, password,isPending,
      submitHandle,handleLogInWithGoogle
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
.loginBtn-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.google-icon{
  width:30px;
  height:18px;
}
button{
  width:100%;
}
.loginBtn{
  width: 55%;
}
.loginWithGoogle{
  width:55%;
  margin-bottom: 12px;
}

</style>