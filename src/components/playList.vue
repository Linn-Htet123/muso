<template>

  <div v-for="playlist in playlists" :key="playlist.id">
    <div v-if="playlist.id">
      <router-link :to="{name:'playlistDetails',params:{id:playlist.id}}">
        <div class="playList-container" >
          <div class="thumbnail">
            <img :src="playlist.coverUrl">
          </div>
          <div class="playList-info">
            <h3>{{playlist.title}}</h3>
            <p> created by  {{playlist.userName}}</p>
          </div>
          <div class="playList-song-count">
            <strong>{{playlist.songs.length}}</strong>
          </div>
        </div>
      </router-link>
    </div>
    </div>


</template>

<script>
export default {
  props:['playlists']
}
</script>

<style scoped>
    .playList-container{
      display: flex;
      align-items: center;
      padding: 20px;
      background-color: transparent;
      margin:16px 0;
      transition: all ease .2s;
      z-index: 1;
      cursor:pointer;
      height: 100px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
    }
    .playList-container:hover{
      box-shadow:
          0px 4px 10px rgba(255, 255, 255, 0.06);
      transform: scale(1.02);
      transition: all ease .2s;
      border-radius:7px;

    }
    .thumbnail{
      max-width: 100px;
      max-height: 100px;
      border-radius:10px ;
      overflow: hidden;
    }
    .thumbnail img{
      width:120%;
      border-radius: 10px;
      height: 100%;
    }
    .playList-info{
      margin-left: 20px;
    }
    .playList-song-count{
      margin-left: auto;
    }
    h3,p,strong{
      color: rgba(255, 255, 255, 0.71);
    }
</style>