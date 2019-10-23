const DataBase = require('./DataBase')

var getShareID = (function () {
  var unuqieShareNumber = (new DataBase()).getShareNumber() + 1;
  return function () { return unuqieShareNumber++; }
}) ();

class Share{
  constructor(shareTitle = 'defaultShare', sharePrice = 0, maxChangeValue = 0, distribution = 'nomal', numberOfShare = 0, ID = getShareID()){
    this.shareTitle = shareTitle
    this.sharePrice = sharePrice
    this.maxChangeValue = maxChangeValue
    this.distribution = distribution
    this.numberOfShare = numberOfShare
    this.ID = ID
  }
}

module.exports = Share
