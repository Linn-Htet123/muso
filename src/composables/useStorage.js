// import {projectStorage} from "@/firebase/config";
// import getUser from "./getUser";
// import {ref} from "vue";
// const {user} = getUser()
// const useStorage = ()=>{
//     const error = ref(null)
//     const filePath = ref(null)
//     const url = ref(null)
//
//     const uploadImage = async (file)=>{
//         console.log(file)
//         console.log('user: ',user.value.uid)
//         filePath.value = `covers/${user.value.uid}/${file.name}/`
//         const fileRef = projectStorage.ref(filePath.value)
//         try {
//             const res = await fileRef.put(file)
//             url.value = res.ref.getDownloadURL()
//
//         }catch(err){
//             console.log(err.message)
//             error.value =  "Couldn't upload the image"
//         }
//     }
//     return{error,url,uploadImage,filePath}
// }
// export default useStorage

import {ref} from "vue";
import {projectStorage} from "@/firebase/config";
import getUser from "@/composables/getUser";
const {user}  = getUser()
const useStorage = ()=>{
    const error = ref(null)
    const filePath = ref(null)
    const url = ref(null)


    const uploadImage =  async (file,folder)=>{
        filePath.value = `${folder}/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)
        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            error.value = err.message
        }
        return {url,filePath,error}
    }
    const deleteImage = async (path) =>{
        const storageRef = projectStorage.ref(path)
        try {
                await storageRef.delete()
        }catch(err){
            console.log(err.message)
        }
    }

    return{ uploadImage,deleteImage}
}

export default useStorage

