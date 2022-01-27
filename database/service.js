const con = require('./config').con
const sql = require('mysql')

async function getTickets() {
    con.query("SELECT * FROM Tickets", (err, result) => {
        if (err) throw err

        console.log(`Get Tickets - ${result}`)
        return result
    })
}

async function getTicket(ticketId) {
    con.query("SELECT * FROM Tickets WHERE id = $ticketId", (err, result) => {
        if (err) throw err

        console.log(`Get Ticket - ${result}`)
        return result
    })
}

async function addTicket(owner) {
    con.query("INSERT INTO Tickets (owner) VALUES ($owner)", (err, result) => {
        if (err) throw err

        console.log(`Added Ticket - ${result}`)
        return result
    })
}

module.exports = {
    getTickets: getTickets,
    getTicket: getTicket,
    addTicket: addTicket
}