import { pool } from "../../config/postgresqlconfig.js";
import bcrypt  from 'bcrypt'

export class UserModel{

    static async createUser(id,name, email,password){

        const sql =
        "INSERT INTO users (id,name,password,email) VALUES ($1, $2, $3, $4) RETURNING *";
        
        const newPassword = await this.hashPassword(password)
        const values = [id,name,newPassword,email];          

        try {
            const result = await pool.query(sql, values);
                        
            if (result.rows.length > 0) return true;            
    
            return false;
        } catch (error) {
            throw error;
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
            // console.log(error)
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