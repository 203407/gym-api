import express from 'express'
import { json } from 'express';
import 'dotenv/config'
import { userRouter } from './routes/user.js';
import { rutineRouter } from './routes/rutine.js';
import { culturistRouter } from './routes/culturist.js';

const app = express()
app.disable('x-powered-by')
app.use(json())

const port = process.env.PORT || 3000 

app.use('/user',userRouter)
app.use('/rutine',rutineRouter)
app.use('/culturist',culturistRouter)
app.listen(port, () => {
    console.log('server up ')
})

