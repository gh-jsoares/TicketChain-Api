const { Ticket } = require("../objects/ticket")

module.exports = {
    TicketService: class TicketService {
        constructor() {
            this.tickets = {}
            this.nextTicket = 1
            this.currentTicket = 0
        }

        requestTicket(owner) {
            const now = Date.now()
            const ticket = new Ticket(this.nextTicket++, owner, now)
            this.tickets[owner] = ticket

            return ticket
        }

        hasTicket(owner) {
            return this.tickets[owner] != null
        }

        useTicket(owner) {
            const ticket = this.tickets[owner]
            if (ticket) {
                this.currentTicket = ticket.Id
                delete this.tickets[owner]
            }
        }

        countTickets() {
            return Object.keys(this.tickets).length
        }

        reset() {
            this.tickets = {}
            this.nextTicket = 1
        }
    }
}