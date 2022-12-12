<template>
  <div class="modal-container">
        <form class="modal">
            <h4>Are you sure you want to delete?</h4>
            <div class="btn-container">
               <div>
                 <button @click.prevent="isDeleteHandle('Discard')">Discard</button>
                 <button @click.prevent="isDeleteHandle('Sure')">Sure</button>
               </div>
            </div>
        </form>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
    setup(props,context){
      const isDelete = ref(false)
      const isDeleteHandle = (btnType)=>{
        if(btnType == 'Discard'){
          isDelete.value = false
        }else{
          isDelete.value = true
        }
        console.log(isDelete.value)
        context.emit('isDeleteCheck', isDelete.value)
      }
      return{isDelete,isDeleteHandle}
    }
}
</script>

<style scoped>
  .modal-container{
      width: 100vw;
      height: 100vh;
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom:0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.67);
  }
  .btn-container{
    margin-top: 12px;
    display: flex;
    justify-content:flex-end;
  }
  .btn-container button{
    margin-left:8px;
  }
  .modal{
    max-width: 290px;
  }

</style>