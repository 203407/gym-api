import { pool } from "../../config/postgresqlconfig.js";
import crypto from 'node:crypto'

export class RutineModel{

    static async getAllRutines (){
        const sql  = "select * from rutine"
        

        try {            
            const result = await pool.query(sql);                       
            let data = []
            
            await Promise.all(result.rows.map( async (rutine) => {                
                const sqlrutine = "select * from seccionrutine where rutineid = $1";
                const values = [rutine.id];

                try {
                    const resultrutine = await pool.query(sqlrutine, values);

                    let allValue = {
                        rutine,
                        "exercices": resultrutine.rows
                    };
                    data = [...data, allValue]
                } catch (error) {
                    console.log(error);
                }
            }))
            return data                        

        } catch (error) {            
            return false
            
        }        
    }

    static async createRutine (userId,nameUser,nameRutina){
        const idRutine = crypto.randomUUID()    

        const slq = "insert into rutine (id,userid,nameuser,namerutina) values ($1, $2, $3, $4) RETURNING *"
        const values = [idRutine,userId,nameUser,nameRutina]

        try {
            const result = await pool.query(slq, values);

            if (result.rows.length > 0) {                
                return result.rows[0];
            }else{
                return false;                                
            }

        } catch (error) {
            console.log(error)
        }


        return null
    }

    static async getAllRutinesByUserId (userId) {
        const sql  = "select * from rutine where userid = $1"
        const values = [userId]

        try {      
            let data = []      
            const result = await pool.query(sql,values);                       
            
            await Promise.all(result.rows.map( async (rutine) => {                            

                const sqlrutine = "select * from seccionrutine where rutineid = $1";
                const values = [rutine.id];

                try {
                    const resultrutine = await pool.query(sqlrutine, values);

                    let allValue = {
                        rutine,
                        "exercices": resultrutine.rows
                    };
                    data = [...data, allValue]
                } catch (error) {
                    console.log(error);
                }

            }))
            return data                        

        } catch (error) {            
            return false            
        }        
    }

    static async deleteByRutineId(rutineId){
        const sql = "delete from rutine where id = $1 RETURNING *"
        const values =  [rutineId]
        
            try {
                const result = await pool.query(sql, values);                                
                
                if(result.rows.length > 0){
                    return true
                }else{
                    return false
                }

            } catch (error) {
                console.log(error)
            }

        

    }
}