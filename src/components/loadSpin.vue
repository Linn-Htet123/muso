<template>
  <div class="spinnerContainer">
    <div class="spinner">

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .spinnerContainer{
    padding: 0px 8px;
  }
  .spinner{
    width:13px;
    height: 13px;
    border-radius: 50%;
    background-color: transparent;
    border:3px solid transparent;
    border-top-color: white;
    border-right-color: white;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>