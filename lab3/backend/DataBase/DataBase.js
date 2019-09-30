const fs = require('fs');

class DataBase {
    constructor(){
        try {
            let db = JSON.parse(fs.readFileSync('./DataBase/DataBase.json'))
            this.pictures = db.pictures
            this.users = db.users
        }
        catch (e) {
            console.log("Init DataBase")
            this.pictures = []
            this.users = []
            this.updateDataBase()
        }
    }

    addPictureToDataBase(newPicture){
        this.pictures.push(newPicture)
        this.updateDataBase()
    }

    getPictureByID(ID){
        for(let picture of this.pictures)
            if(picture.ID == ID)
                return picture
    }

    changePicture(newPicture){
        for(let i = 0; i < this.pictures.length; ++i)
            if(this.pictures[i].ID == newPicture.ID)
                this.pictures[i] = newPicture
        this.updateDataBase()
    }

    getPictureNumder(){
        return this.pictures.length;
    }

    getPicturesMas(){
        return this.pictures
    }

    removePictureFromDataBaseByID(ID){
        for(let i = 0; i < this.pictures.length; ++i){
            if(this.pictures[i].ID == ID){
                this.pictures.splice(i, 1)
            }
        }
        this.updateDataBase()
    }

    addUserToDataBase(newUser){
        this.users.push(newUser)
        this.updateDataBase()
    }


    updateDataBase(){
        fs.writeFileSync('./DataBase/DataBase.json', JSON.stringify({ pictures: this.pictures, users: this.users }))
    }
}

module.exports = DataBase