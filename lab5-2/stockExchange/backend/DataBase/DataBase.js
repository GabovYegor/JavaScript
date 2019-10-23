const fs = require('fs');

class DataBase {
  constructor(){
    try {
      let db = JSON.parse(fs.readFileSync('./DataBase/DataBase.json'))
      this.brokers = db.brokers
      this.shares = db.shares
      this.exchangeSettings = db.exchangeSettings
    }
    catch (e) {
      console.log("Init DataBase")
      this.brokers = []
      this.shares = []
      this.updateDataBase()
    }
  }

  getBrokersNumber(){
    return this.brokers.length
  }

  getShareNumber(){
    return this.shares.length
  }

  updateDataBase(){
    fs.writeFileSync('./DataBase/DataBase.json',
      JSON.stringify({ brokers: this.brokers, shares: this.shares, exchangeSettings: this.exchangeSettings }))
  }
}
