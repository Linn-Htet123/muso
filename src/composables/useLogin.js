import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
const isPending = ref(false)
const error = ref(null)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {

    const res = await projectAuth.signInWithEmailAndPassword(email, password)
    isPending.value = false
    error.value = null
    return res
  }
  catch(err) {
    console.log(err.message)
    error.value = 'Incorrect login credentials'
  }
}

const useLogin = () => {
  return { error, login, isPending }
}

export default useLogin