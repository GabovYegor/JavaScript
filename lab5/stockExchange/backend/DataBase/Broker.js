const DataBase = require('./DataBase')

class Broker{
  constructor(userName = 'defaultUser', amountOfMoney = 10000, ID = 0){
    this.userName = userName
    this.amountOfMoney = amountOfMoney
    this.ID = ID
  }
}

module.exports = Broker
