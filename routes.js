const express = require('express')
const dbService = require('./database/service')
const router = express.Router()

router.route('/tickets').get((req, res) => {
    dbService.getTickets().then(result => {
        res.json(result[0])
    })
})

router.route('/tickets/:id').get((req, res) => {
    dbService.getTicket(req.params.id).then(result => {
        res.json(result[0])
    })
})

router.route('/addTicket').post((req, res) => {
    dbService.addTicket(req.body).then(result => {
        res.status(201).json(result)
    })
})

module.exports = {
    router
}