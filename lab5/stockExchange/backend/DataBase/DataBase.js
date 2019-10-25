const fs = require('fs');
const Broker = require('./Broker')
const Share = require('./Share')

var getBrokerID = (function () {
    var unuqieBrokersNumber = 1;
    return function () { return unuqieBrokersNumber++; }
}) ();

var getShareID = (function () {
  var unuqieSharesNumber = 1;
  return function () { return unuqieSharesNumber++; }
}) ();

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
      this.exchangeSettings = {}
      this.updateDataBase()
    }
  }

  getBrokerMas(){
    return this.brokers
  }

  getShareMas(){
    return this.shares
  }

  addBroker(receivedData){
    this.brokers.push(new Broker(receivedData.userName, receivedData.amountOfMoney, getBrokerID()))
    this.updateDataBase()
  }

  addShare(receivedData){
    this.shares.push(new Share(receivedData.shareTitle, receivedData.sharePrice,
                               receivedData.maxChangeValue, receivedData.distribution, receivedData.numberOfShare, getShareID()))
      this.updateDataBase()
  }

  updateBrokerByID(ID, newMoney){
    for(let i = 0; i < this.brokers.length; ++i){
      if(this.brokers[i].ID == ID){
        this.brokers[i].amountOfMoney = newMoney
      }
    }
    this.updateDataBase()
  }

  deleteBrokerById(ID){
    for(let i = 0; i < this.brokers.length; ++i){
      if(this.brokers[i].ID == ID){
        this.brokers.splice(i, 1)
      }
    }
    this.updateDataBase()
  }

  deleteShareById(ID){
    for(let i = 0; i < this.shares.length; ++i){
      if(this.shares[i].ID == ID){
        this.shares.splice(i, 1)
      }
    }
    this.updateDataBase()
  }

  updateExchangeSettings(newExchangeSettings){
    this.exchangeSettings = newExchangeSettings
    this.updateDataBase()
  }

  updateDataBase(){
    fs.writeFileSync('./DataBase/DataBase.json',
      JSON.stringify({ brokers: this.brokers, shares: this.shares, exchangeSettings: this.exchangeSettings }))
  }
}

module.exports = DataBase
