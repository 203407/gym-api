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
    changepassword = async (req,res)=>{
        
        const {pass,newpass} = req.body
        const id = req.user.id               
        const status = await this.userModel.changepassword(pass,newpass,id)                

        if(status.status){
            res.status(200).json("Contraseña actualizada correctamente")
        }else{
            res.status(400).json(status.message)
        }
        
    }

}