<template>
  <div v-if="documents">
      <playList :playlists="documents"/>
  </div>
  <small v-if="error" class="error">{{error}}</small>
</template>

<script>

import getCollection from "@/composables/getCollection";
import playList from "@/components/playList";
export default {
  name: 'HomeView',
  components:{playList},
  setup(){
    const {error, documents} = getCollection('playlists')

    return{error,documents}
  }
}
</script>
<style>

</style>