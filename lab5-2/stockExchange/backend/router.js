const DataBase = require('./DataBase/DataBase')
const express = require('express')
router = express.Router()

router.get('/initBrokerMas', (req, res) => {
  let brokers = (new DataBase).getBrokerMas()
  console.log(brokers)
  res.json(brokers)
});

router.get('/initShareMas', (req, res) => {
  let shares = (new DataBase).getShareMas()
  console.log(shares)
  res.json(shares)
});

router.get('/initExchangeSettings', (req, res) => {
  let db = new DataBase
  res.json( { dateStart:  db.exchangeSettings.dateStart, timeStart: db.exchangeSettings.timeStart,
              tradingDuration: db.exchangeSettings.tradingDuration, timeToRecountShare: db.exchangeSettings.timeToRecountShare} );
});

router.post('/exchangeSettings', (req, res) => {
  (new DataBase()).updateExchangeSettings(req.body)
  res.end()
})

router.post('/addBroker', (req, res) => {
  console.log(req.body)
  let db = new DataBase()
  db.addBroker(req.body)
  res.end()
})

router.post('/addShare', (req, res) => {
  console.log(req.body)
  let db = new DataBase()
  db.addShare(req.body)
  res.end()
})

router.post('/updateBroker', (req, res) => {
  console.log('update broker money')
  console.log(req.body)
  let db = new DataBase()
  db.updateBrokerByID(req.body.ID, req.body.newMoney)
  res.end()
})

router.post('/deleteBroker', (req, res) => {
  console.log(req.body)
  let db = new DataBase()
  db.deleteBrokerById(req.body.ID)
  res.end()
})

router.post('/deleteShare', (req, res) => {
  console.log(req.body)
  let db = new DataBase()
  db.deleteShareById(req.body.ID)
  res.end()
})

module.exports = router
