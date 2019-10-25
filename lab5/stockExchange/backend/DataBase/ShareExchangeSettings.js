class exchangeSettings {
  constructor(dateStart = '01.01.2000', timeStart = '00:00', tradingDuration = 0, timeToRecountShare = 0){
    this.dateStart = dateStart
    this.timeStart = timeStart
    this.tradingDuration = tradingDuration
    this.timeToRecountShare = timeToRecountShare
  }
}

module.exports = exchangeSettings
