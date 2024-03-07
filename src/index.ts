import express, {Request,Response}from "express"
import cors from "cors"
const app = express()

const PORT = 5000


app.use(express.json())
app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(express.static('public'))

app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})