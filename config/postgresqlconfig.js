import pkg from 'pg';
const { Pool } = pkg;


const config = {
    host: process.env.HOSTDB,
    port: 5432,
    user: process.env.USERDB,
    database: process.env.DATABASEDB,
    password: process.env.PASSWORDDB,
    ssl:{}
  };
  

export const pool = new Pool(config);
