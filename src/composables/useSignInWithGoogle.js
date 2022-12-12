import {projectGoogleAuthProvider} from "@/firebase/config";
import {projectAuth} from "@/firebase/config";
import {ref} from 'vue';

const useSignInWithGoogle = ()=>{
    const errorGoogle = ref(null)
    const googleLogIn = async ()=>{
        try{
            const res = await projectAuth.signInWithPopup(projectGoogleAuthProvider);


            return res
        }catch(err){
            console.log(err.message)
            errorGoogle.value = err.message
        }
    }

    return{googleLogIn,errorGoogle}
}

export default useSignInWithGoogle