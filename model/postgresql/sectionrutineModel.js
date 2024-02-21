import { pool } from "../../config/postgresqlconfig.js";
import crypto from 'node:crypto'

export class SectionRutineModel {

    static async createSectionRutines(rutineId,sectionRutines){                

        await Promise.all(sectionRutines.map( async (rutine,) => {                
            
            const idSectionRutine = crypto.randomUUID() 

            const sql = "insert into seccionrutine (id,rutineid,dia,ejercicios,muscle) values ($1, $2, $3, $4, $5)  RETURNING * "
            
            const values = [idSectionRutine, rutineId,rutine.dia,rutine.ejercicios,rutine.muscle ]

            try {
                const result = await pool.query(sql, values);
                if (result.rows.length > 0) {                
                    console.log("agregado")
                }else{
                    console.log("error al agregar")                      
                }

            } catch (error) {
                console.log(error)
            }                   
        }))
        return true
    }

    static async deleteById(rutineId){

        const sql = "delete from seccionrutine where rutineid = $1 RETURNING * "
        const values = [rutineId]

        try {
            const result = await pool.query(sql,values)

            if(result.rows.length > 0){
                return true
            }
        } catch (error) {
            
        }


    }
}