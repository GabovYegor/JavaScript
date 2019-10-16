class AuctionSettings {
    constructor(dataStart = '01.01.2000', timeStart = '00:00', timeToBargain = 0, timeToExplore = 0, timeToNextPicture = 0){
        this.dataStart = dataStart
        this.timeStart = timeStart
        this.timeToBargain = timeToBargain
        this.timeToExplore = timeToExplore
        this.timeToNextPicture = timeToNextPicture
    }
}

module.exports = AuctionSettings