import mysql from "mysql"


const conn = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'',
    database:'UsedGamesBS'
})

export default conn