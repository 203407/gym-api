import crypto from 'node:crypto'
import { generateToken } from '../Auth/generateToken.js'

export class UserController{
    constructor(userModel){
        this.userModel = userModel
    }

    createUser = async (req,res) => {
        const {name, email,password} = req.body

        const idUser = crypto.randomUUID()        
        const status =  await this.userModel.createUser(idUser,name, email,password)
                
        if(typeof status === 'object' ){
            res.status(400).json(status.message)                       
        }else{            
            res.status(200).json("creado correctamente")
        }       

        
        
        // if (status) res.status(200).json(status) 


        
        // res.status(400).json("Problemas al crear el usuario")
    }

    login = async (req,res) => {
        const {email,password} = req.body
        const check = await this.userModel.login(email,password)

        if(typeof check === 'object' ){
            
            const token = generateToken(check)

            const userInfo = {  
                ...check, token:token
            }
            res.status(200).json(userInfo)                  
        }else{            
            res.status(400).json(check)
        }        
    }

}