import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Esr0711!", 
    database: "gerenciarfuncionarios"
})