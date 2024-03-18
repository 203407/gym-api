import { pool } from "../../config/postgresqlconfig.js";
import bcrypt  from 'bcrypt'

export class UserModel{

    static async createUser(id,name, email,password){

        

        const sqlvalidator = "select * from users where email=$1"
        const valuesValidator = [email]
    
        try {
            
            const resultValidator = await pool.query(sqlvalidator,valuesValidator)
            
            if(resultValidator.rows.length > 0){                
                return {status:false,message:"Correo ya registrado"}
            }else{
                const sql = "INSERT INTO users (id,name,password,email) VALUES ($1, $2, $3, $4) RETURNING *";            
                const newPassword = await this.hashPassword(password)
                const values = [id,name,newPassword,email];          
            
                try {
                    const result = await pool.query(sql, values);                                
                    if (result.rows.length > 0) return true;            
            
                    return {status:false,message:"error al registrarse"}

                } catch (error) {
                    throw error;
                }    
                    
            }            
        } catch (error) {
            console.log(error)
        }
               
    }   

    static async login(email,password){
        
        const sql = "select * from users where email = $1"
        const values = [email]

        try {
            const result = await pool.query(sql, values);                                    
            
            if (result.rows.length > 0){
                
                const user = result.rows[0]                
                const checkPassword = await this.comparePassword(password,user.password)           

                const userInfo = {
                    "id":user.id,
                    "username":user.name,                           
                }                
                
                if(checkPassword) return userInfo

                return 'Incorrect Password'                              
            }else{
                return 'email not found'
        }
            
        } catch (error) {
            console.log(error)
        }

    }


    static async changepassword(pass,newpass,id){
        const status={
            status:true,
            message:"completado"
        }

        const sql = "select * from users where id =$1"
        const values = [id]


        try {
            const result = await pool.query(sql,values)

            if(result.rows.length > 0){

                const user = result.rows[0]     
                const checkPassword = await this.comparePassword(pass,user.password)                           
                const newPassword = await this.hashPassword(newpass)


                if(checkPassword){   
                                        
                    const sqlchange = "UPDATE users set password=$1 where id = $2 RETURNING *"
                    const valueschange = [newPassword,id]

                    try {
                        const resultchange = await pool.query(sqlchange,valueschange)

                        if(resultchange.rows.length > 0){
                            return status
                        }else{
                            status.status=false
                            status.message="error, intente mas tarde"
                            return status
                        }

                    } catch (error) {    
                        console.log(error)                    
                    }

                    
                }else{
                    status.status=false
                    status.message="la contraseña no es la misma"
                    return status
                }
            }
        
        } catch (error) {
            
        }        
    }

    static async hashPassword(password) {
        const hash = await  bcrypt.hash(password,10)
        return hash
    }

    static async comparePassword(recivedPassword,hashPassword){
        const compare = await bcrypt.compare(recivedPassword,hashPassword)
        return compare
    }
}