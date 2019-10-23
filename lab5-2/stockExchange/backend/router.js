const express = require('express')
router = express.Router()

router.get('/initExchangeSettings', (req, res)=>{
  console.log('get init')
  res.json( { dateStart: '10.01.2000' , timeStart: '23:18', tradingDuration: '40', timeToRecountShare: '228'});
});

router.get('/:num', (req, res)=>{
  console.log('get data')
  console.log(req.params.num)
  res.json( { "dateStart": 10 });
});

module.exports = router
