<template>
  <div>
    <div class="song-list-btn-container">
      <p>song list</p>
      <svg v-if="!toShowAddSong" @click="toShowAddSong=true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>


    <form @submit.prevent="addSongHandle"  v-if="toShowAddSong">
          <h3>Add a song</h3>

            <input type="text" v-model="title" placeholder="song" required>
            <input type="text" v-model="artist" placeholder="artist" required>
            <div class="btn-container">
              <button>Add</button>
            </div>

      </form>
  </div>
</template>

<script>
import {ref} from "vue";
import useDocument from "@/composables/useDocument";

export default {
  props:['playlist'],
  setup(props){
    const toShowAddSong = ref(false)
    const title = ref('')
    const artist = ref('')
    const {error:delDocError ,isPending,updateDoc} = useDocument('playlists', props.playlist.id)
    const addSongHandle = async ()=>{
        const newSong = {
          title:title.value,
          artist:artist.value,
          id:Math.floor(Math.random() * 10000000)
        }
       await updateDoc({
         songs:[...props.playlist.songs,newSong]
       })
        title.value = ''
        artist.value = ''
        toShowAddSong.value = false
    }
    return{title,artist,toShowAddSong,addSongHandle}
  }
}
</script>

<style scoped>
  form{
    max-width: 100%;
    margin-top: 20px;
  }
  .btn-container{
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
  }
  .song-list-btn-container{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  svg{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  p{
    color:white
  }
</style>