const express = require('express')
const { IssueService } = require('./services/IssueService')
const { TicketService } = require('./services/TicketService')
const router = express.Router()

const issueService = new IssueService()
const ticketService = new TicketService()

router.route('/tickets/current').get((_, res) => {
    res.json({ "currentTicket": ticketService.currentTicket })
})

// only for user
router.route('/tickets/has').post((req, res) => {
    const owner = req.body.owner
    res.json({ "hasTicket": ticketService.hasTicket(owner) })
})

// only for user
router.route('/tickets/request').post((req, res) => {
    const owner = req.body.owner
    const ticket = ticketService.requestTicket(owner)
    res.json({ "ticket": ticket })
})

// only for worker
router.route('/tickets/use').post((req, res) => {
    const owner = req.body.owner
    ticketService.useTicket(owner)
    res.json({ "success": "Used ticket" })
})

router.route('/tickets/count').get((_, res) => {
    const count = ticketService.countTickets()
    // 1.87 -> DUMMY VALUE FOR AVERAGE WAIT TIME PER TICKET
    res.json({ "ticketCount": count, "waitTime": count * 1.87 })
})

// only for worker
router.route('/issues').get((req, res) => {
    res.json({ "issues": issueService.getIssues() })
})

router.route('/issues/has').get((req, res) => {
    res.json({ "hasIssues": issueService.hasIssues() })
})

// only for worker
router.route('/issues').post((req, res) => {
    const body = req.body
    const issue = issueService.newIssue(body.type, body.description, body.date)
    res.json({ "issue": issue })
})

// only for worker
router.route('/issues/delete').post((req, res) => {
    const issueId = req.body.id
    issueService.removeIssue(issueId)
    res.json({ "success": "Removed issue" })
})

router.route('/dev/reset').get((req, res) => {
    issueService.reset()
    ticketService.reset()
    res.json({ "success": "Reset tickets and issues" })
})

router.route('/dev/random').get((req, res) => {
    const random = Math.round(Math.random() * 100) + 31 // random between 30 - 130

    for (let i = 0; i < random; i++) {
        ticketService.requestTicket(`owner-${i}`)
    }

    res.json({ "success": "Randomized tickets", "count": random, "tickets": ticketService.tickets })
})

module.exports = {
    router
}