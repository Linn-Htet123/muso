import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  const isPending = ref(false)
  const error = ref(null)
  const userId = ref(null)
  // add a new document
  const addDoc = async (doc) => {
    isPending.value = true
    error.value = null

    try {
    const res = await projectFirestore.collection(collection).add(doc)
      isPending.value= false
      userId.value = res.id
    }
    catch(err) {
      console.log(err.message)
      isPending.value = false
      error.value = 'could not send the message'
    }
  }

  return { error, addDoc, userId, isPending }

}

export default useCollection