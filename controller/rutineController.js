

export class RutineController {
    constructor(rutineModel,sectionrutinesModel)    {
        this.rutineModel = rutineModel
        this.sectionrutinesModel = sectionrutinesModel
    }

    getAllRutines = async (req,res) =>{
        const rutines = await this.rutineModel.getAllRutines()      
        res.json(rutines)
    }
    
    createRutine = async (req,res)=>{
        
        const user = req.user

        const {namerutina,sectionrutines} = req.body

        const rutine = await this.rutineModel.createRutine(user.id,user.username,namerutina)
        
        const status = await this.sectionrutinesModel.createSectionRutines(rutine.id, sectionrutines)

        res.json(status)

    }


    getAllRutinesByUserId = async (req,res) =>{
        const user = req.user
        const rutinesByUserId = await this.rutineModel.getAllRutinesByUserId(user.id)
        res.json(rutinesByUserId)
    }

    deleteByRutineId = async (req,res)=>{

        const rutineId = req.params.id        
        const status = await this.rutineModel.deleteByRutineId(rutineId)

        if (status){
            const sectionStatus = await this.sectionrutinesModel.deleteById(rutineId)
            res.json(sectionStatus)    
        }else{
            res.json(false)
        }

        
    }



}