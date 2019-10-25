class Share{
  constructor(shareTitle = 'defaultShare', sharePrice = 0, maxChangeValue = 0, distribution = 'nomal', numberOfShare = 0, ID = 0){
    this.shareTitle = shareTitle
    this.sharePrice = sharePrice
    this.maxChangeValue = maxChangeValue
    this.distribution = distribution
    this.numberOfShare = numberOfShare
    this.ID = ID
  }
}

module.exports = Share
