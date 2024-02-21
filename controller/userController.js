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
        
        res.json(status)        
    }

    login = async (req,res) => {
        const {email,password} = req.body
        const check = await this.userModel.login(email,password)

        if(typeof check === 'object' ){
            
            const token = generateToken(check)

            res.json(token)            

        }else{            
            res.json(check)
        }

        
    }

}