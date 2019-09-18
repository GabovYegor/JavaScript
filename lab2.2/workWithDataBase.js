const fs = require('fs');
const bcrypt = require('bcrypt')

class DataBase {
    constructor(){
        let rawData = fs.readFileSync('./DataBase.json')
        let db = JSON.parse(rawData)
        this.admin = db.admin
        this.currentUserName = db.currentUserName
        this.userMas = db.userMas
        this.booksMas = db.booksMas
    }

    addAdmin (admin) {
        this.admin = admin
        this.updateDataBase()
    }

    setCurrentUser (currentUserName) {
        this.currentUserName = currentUserName
        this.updateDataBase()
    }

    getCurrentUser(){
        for(user of this.userMas){
            if(user.username === this.currentUserName)
                return user
        }
    }

    addUser (user) {
        this.userMas.push(user)
        this.updateDataBase()
    }

    getUserCount() { return this.userMas.length }
    getUsers(){ return this.userMas }

    addBook (book) {
        this.booksMas.push(book)
        this.updateDataBase()
    }

    getBookCount(){ return this.booksMas.length }

    getBookByID(id){
        for(let book of this.booksMas)
            if (book.id == id)
                return book
    }

    getBooksMas(){
        return this.booksMas
    }

    updateUser(user){
        for(let i = 0; i < this.userMas.length; ++i)
            if(this.userMas[i].username === user.username)
                this.userMas[i] = user
        this.updateDataBase()
    }

    updateBooks(book){
        for(let i = 0; i < this.booksMas.length; ++i)
            if(this.booksMas[i].name === book.name)
                this.booksMas[i] = book
        this.updateDataBase()
    }

    updateDataBase () {
        fs.writeFileSync('./DataBase.json', JSON.stringify(this))
    }
}

class Book{
    constructor(author, name, id = db.getBookCount() + 1, location = 0){
        this.author = author
        this.name = name
        this.id = id
        this.location = location
    }
}

class User{
    constructor(username = 'default', password = 'default', books = [], id = db.getUserCount() + 1, flag = false){
        this.username = username
        if(flag)
            this.password = password
        else
            this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        this.books = books
        this.id = id
    }

    getBook(bookID){
        db = new DataBase()
        let receivedBook = db.getBookByID(bookID)
        let book = new Book(receivedBook.author, receivedBook.name, receivedBook.id, receivedBook.location)

        if(book && !book.location) {
            this.books.push(book)
            book.location = this.id
            db.updateUser(this)
            db.updateBooks(book)
            return 1;
        }
        return 0;
    }
}

function initDataBase(){
    fs.writeFileSync('./DataBase.json', JSON.stringify({admin: '', currentUserName: '', userMas: [], booksMas: []}))
}

module.exports = {
        initDataBase: initDataBase,
        DataBase: DataBase,
        User: User,
        Book: Book
}
