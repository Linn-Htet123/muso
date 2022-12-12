<template>
  <navBar :dropDown="dropDown"/>
  <div class="content" @click="dropDown = false">
    <router-view/>
  </div>

</template>
<script>
import navBar from "@/components/navBar";
import {ref} from "vue";
export default {
  components:{navBar},
  setup(){
    const dropDown = ref(false);
    return{dropDown}
  }

}
</script>
<style>
  .content{
    margin:0 auto;
    max-width:1200px;
    padding:0px 20px;
  }
</style>
