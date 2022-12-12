<template>
    <div>
      <playList :playlists="playlists"/>
    </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import playList from "@/components/playList.vue";
export default {
  components:{playList},
    setup(){
      const{user} = getUser()
      console.log(user.value.uid)
      const {error, documents:playlists} = getCollection('playlists','userId','==',`${user.value.uid}`)

      return{playlists}
    }
}
</script>

<style scoped>

</style>