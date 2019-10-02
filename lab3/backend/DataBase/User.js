const DataBase = require('./DataBase')

var getUserID = (function () {
    var unuqieUserNumber = (new DataBase()).getUserNumder() + 1;
    return function () { return unuqieUserNumber++; }
}) ();

class User{
    constructor(userName = 'defaultUser', amountOfMoney = 10000, isInAuction = false, ID = getUserID()){
        this.userName = userName
        this.amountOfMoney = amountOfMoney
        this.isInAuction = isInAuction
        this.ID = ID
    }
}

module.exports = User