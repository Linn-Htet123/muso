<template>
  <div>
      <form @submit.prevent="submitHandle">
        <h3>Create new playlists</h3>
          <input type="text" required placeholder="Title" v-model="title" autocomplete>
          <textarea placeholder="description" required v-model="description" autocomplete></textarea>
          <label>Upload cover photo</label>
          <input type="file" @change="changeHandle">
          <strong class="error">{{errorFile}}</strong>
          <div>
            <button v-if="!isPending">Create</button>
            <button v-if="isPending" disabled>
              <LoadSpin/>
            </button>

          </div>

      </form>
  </div>
</template>

<script>
import {ref} from "vue";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import {timeStamp} from "@/firebase/config";
import LoadSpin from "@/components/loadSpin";
import {useRouter} from "vue-router";
export default {
  components: {LoadSpin},
  setup(){
      const title = ref('')
      const description = ref('')
      const file = ref(null)
      const errorFile = ref(null)
      const fileType = ref(["image/png","image/jpeg"])
      const {error,addDoc,userId, isPending} = useCollection('playlists')
      const {uploadImage} = useStorage()
      const router = useRouter()
    const {user} = getUser()

      const submitHandle =async ()=>{
        if(file.value){
         const{url,filePath,error} = await uploadImage(file.value,'covers')
          await addDoc({
            userId:user.value.uid,
            userName:user.value.displayName,
            title:title.value,
            description:description.value,
            coverUrl:url.value,
            filePath:filePath.value,
            songs:[],
            createdAt:timeStamp()
          } )
        }
        if(!error.value){
          console.log('doc added')
          router.push({name:'playlistDetails',params:{id:userId.value}})
        }

      }

      const changeHandle = (e)=>{
        const selected = e.target.files[0]

        if(selected && fileType.value.includes(selected.type)){
          file.value = selected
          errorFile.value = null

        }else{
          file.value = null
          errorFile.value = "Please choose png or jpeg file type"
        }

      }

      return{
        title,description,errorFile, isPending,
        submitHandle,changeHandle,
      }
    }
}
</script>

<style scoped>
    input[type='file']{
      border:none;
      outline:none;
      padding:4px 8px;
      border-radius: 8px;
      cursor: pointer;
    }
    textarea{
      height: 150px;
    }
    form div{
     text-align: right;
    }
</style>