const mysql = require('mysql');

// Create Connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

// Connect to MySQL
con.connect(err => {
    if (err) throw err
    console.log("TicketChain created")
})

con.query("CREATE DATABASE TicketChain", (err, result) => {
    if (err) throw err
    console.log("TicketChain created")
})

const sql = "CREATE TABLE Tickets (" +
    "id INT AUTO_INCREMENT PRIMARY KEY" +
    "owner VARCHAR(255)" +
    ")"

con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table Tickets created")
})

module.exports = {
    con
}