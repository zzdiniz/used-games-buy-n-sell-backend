import express, {Request,Response}from "express"
import User from "./models/User"
const app = express()
const PORT = 3000
const user:User = {name:'Bruno', age:21}
app.get('/', (req,res)=>{
    res.send('Hello world!')
})
app.get('/user',(req:Request,res:Response)=>{
    res.send(`My name is ${user.name} and i'm ${user.age} years old :)`)
})
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`)
})