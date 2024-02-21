
import {  ref, uploadBytes  } from "firebase/storage";

import { getDownloadURL } from "firebase/storage";

import {  storage} from '../config/firebaseconfig.js';

    

export const uploadImage = async (file) =>{

    
    const fileName = `${Date.now()}-${file.originalname}`;

    try {
        const nameAll = 'img/'+fileName
        const imageRef = ref(storage, nameAll);

        const metadata = {
            contentType: file.mimetype,
        };


        const urlFile= await  uploadBytes(imageRef, file.buffer,metadata).then(async (snapshot) =>  {            
                const newUrl = await getDownloadURL(snapshot.ref)

            return  newUrl
          }).catch((error) => {
            return {"status" : false, "message":"error al subir la imange"}
          })
    
          return urlFile

        
    } catch (error) {
        console.error('Error al subir el archivo:', error);        
        return {"status":false,"error":"Error al subir el archivo"}
    }

}