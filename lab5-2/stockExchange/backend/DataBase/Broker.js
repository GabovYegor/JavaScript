const DataBase = require('./DataBase')

var getUserID = (function () {
  var unuqieBrokersNumber = (new DataBase()).getBrokersNumber() + 1;
  return function () { return unuqieBrokersNumber++; }
}) ();

class Broker{
  constructor(userName = 'defaultUser', amountOfMoney = 10000, ID = getUserID()){
    this.userName = userName
    this.amountOfMoney = amountOfMoney
    this.ID = ID
  }
}

module.exports = Broker
