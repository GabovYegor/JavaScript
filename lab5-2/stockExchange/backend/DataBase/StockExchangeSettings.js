class exchangeSettings {
  constructor(dataStart = '01.01.2000', timeStart = '00:00', tradingDuration = 0, timeToRecountSharePrice = 0){
    this.dataStart = dataStart
    this.timeStart = timeStart
    this.tradingDuration = tradingDuration
    this.timeToRecountSharePrice = timeToRecountSharePrice
  }
}

module.exports = exchangeSettings
