import { pool } from "../../config/postgresqlconfig.js";
import crypto from 'node:crypto'

export class CulturisModel{


    static async createCulturist(userId,nameUser,name,weight,height,competitions,urlImage){
        const idCulturist = crypto.randomUUID()

        const sql = "insert into culturist (id,userid,nameuser,name,weight,height,competitions,picture) values ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING *"

        const values = [
            idCulturist,
            userId,
            nameUser,
            name,
            weight,
            height,
            competitions,
            urlImage
        ]


        try {
            const result = await pool.query(sql,values)
            
            if(result.rows.length > 0) return true

            return false
                        

        } catch (error) {
            console.log(error)
        }
    }


    static async getAllCulturist (){        
        const sql = "select * from culturist"
        try {
            const result = await pool.query(sql)
            return result.rows            
        } catch (error) {
            console.log(error)
            return false
        }
    }


    static async getCulturisByUserId (userId){
        const sql = "select * from culturist where userid=$1"
        const values = [userId]

        try {            
            const result = await pool.query(sql,values)
            return result.rows
        } catch (error) {
            console.log(error)
        }
    }

}