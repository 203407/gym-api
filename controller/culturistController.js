import { uploadImage } from '../firebase/manage.js';

export class CulturistController{
    constructor(culturistModel){
        this.culturistModel = culturistModel
    }

     createCulturist = async (req,res) => {
        const user = req.user

        const file = req.file;
        
        const {name,weight,height,competitions} = req.body                    
        const urlImage = await uploadImage(file)                    
        
        const status = await this.culturistModel.createCulturist(user.id,user.username,name,weight,height,competitions,urlImage)

        if(status == true){
            res.status(200).json("creado")
        }else{
            res.json("error al crear")
        }        
    }

    getAllCulturist = async (req,res) => {
        const culturists = await this.culturistModel.getAllCulturist()
        res.json(culturists)
    }

    getCulturisByUserId = async (req,res) =>{
        const userId = req.user.id
        const culturists = await this.culturistModel.getCulturisByUserId(userId)
        res.json(culturists)

    }

    // deleteByCulturisId = async (req,res) =>{
    // }
}