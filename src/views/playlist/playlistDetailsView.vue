<template>
  <deleteCheck @isDeleteCheck="isDeleteHandle" v-if="isDeleteCheckShow"/>
  <div>
      <div v-if="error">{{error}}</div>
    <div v-if="playlist" class="playlist-details">
      <div class="playlist-info">
            <div class="cover">
               <img :src="playlist.coverUrl">
            </div>
            <h2>{{playlist.title}}</h2>
            <p class="username">{{playlist.userName}}</p>
            <p class="description">{{playlist.description}}</p>
            <button v-if="hasOwn" @click="isDeleteCheckShow = true">Delete</button>
      </div>
      <div class="song-list">
        <addSong :playlist="playlist" v-if="hasOwn"/>
          <p v-if="!playlist.songs.length">No songs have been added to this playlist yet.</p>
        <div class="single-song-container" v-for="song in playlist.songs" :key="song.id">
              <div class="single-song">
                  <h3>{{ song.title }}</h3>
                  <small>{{song.artist}}</small>
              </div>
              <div class="delete-btn-container" v-if="hasOwn" @click="deleteSongHandle(song)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import deleteCheck from "@/components/deleteCheck";
import addSong from "@/components/addSong";
import getDocument from "@/composables/getDocument";
import {computed} from "vue";
import useDocument from "@/composables/useDocument";
import getUser from "@/composables/getUser";
import {useRouter} from "vue-router";
import {ref} from 'vue'
import useStorage from "@/composables/useStorage";
export default {
  props:['id'],
  components:{deleteCheck,addSong},
  setup(props){
    const router = useRouter();
    const {user} = getUser();
    const canDelete = ref(null)

    const isDeleteCheckShow = ref(false)
    const {deleteImage} = useStorage()
    const {error:delDocError ,isPending,deleteDoc,updateDoc} = useDocument('playlists', props.id)
    const {error, document:playlist} = getDocument('playlists',props.id)
      const hasOwn = computed(()=>{
        return playlist.value && user.value && playlist.value.userId == user.value.uid
      })
    const deleteDocumentHandle = async ()=>{
      console.log(canDelete.value)
     if(canDelete.value){
       await deleteImage(playlist.value.filePath)
       await deleteDoc()
       router.push({path:'/'})
     }


    }
    const isDeleteHandle = (isDelete)=>{
      isDeleteCheckShow.value = false
          canDelete.value = isDelete
          deleteDocumentHandle()
    }
    const deleteSongHandle = async (clickSong)=>{
        const songs = playlist.value.songs.filter((eachSong)=>{
              return eachSong.id != clickSong.id
        });
        await updateDoc({
           songs
        })
      // console.log(typeof newSong)
    }
    return {
      error,playlist,hasOwn,canDelete,isDeleteCheckShow,
      deleteDocumentHandle,isDeleteHandle,deleteSongHandle
    }
  }
}
</script>

<style scoped>
.playlist-details {
  display: flex;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  max-width: 100%;
  max-height: 100%;
  width: 600px;
  height: 450px;
}
.cover img {

  overflow: hidden;
  width:120%;
  height:120%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.song-list{
  margin-left: 80px;
  width: 100%;
  height: 550px;
  overflow-y: scroll;
}
h2,p,h3{
  color:white;
}
.single-song-container{
  padding: 20px;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.14);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.song-list::-webkit-scrollbar {
  display: none;
}

svg{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
button{
  margin-bottom: 12px;
}
@media  screen and (max-width: 900px){
  .playlist-details{
      flex-direction: column;
      justify-content: center;
  }
  .description{
    text-align:center
  }
  .song-list{
    margin-left:0px;
    margin-top:20px;
  }
  .cover img{
    width:150%;
    height: 150%;
  }
}
</style>