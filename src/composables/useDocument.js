import {ref} from 'vue'
import {projectFirestore} from "@/firebase/config";

const useDocument = (collection, id)=>{
    const error = ref(null)
    const isPending = ref(null)

    const deleteDoc = async () =>{
        isPending.value = true;
        error.value = null;
        let docRef = projectFirestore.collection(collection).doc(id)
        try{
            const res = await docRef.delete()
            isPending.value = false
            return res
        }catch(err){
            isPending.value = false
            error.value = 'could not delete document'
        }

    }
    const updateDoc = async (update) =>{
        isPending.value = true;
        error.value = null;
        let docRef = projectFirestore.collection(collection).doc(id)
        try{
            const res = await docRef.update(update)
            isPending.value = false
            return res
        }catch(err){
            isPending.value = false
            error.value = 'could not update document'
        }

    }
    return{error, isPending, deleteDoc, updateDoc}
}
export default useDocument