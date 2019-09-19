const fs = require('fs');
const bcrypt = require('bcrypt')

class DataBase {
    constructor(){
        let rawData = fs.readFileSync('./DataBase.json')
        let db = JSON.parse(rawData)
        this.currentUserName = db.currentUserName
        this.userMas = db.userMas
        this.booksMas = db.booksMas
        this.staticMas = db.staticMas
    }

    incrementStaticMas(){
        this.staticMas.push(1)
        this.updateDataBase()
    }

    getStaticMasSize(){
        return this.staticMas.length
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

    getUserByID(id){
        for(let user of this.userMas)
            if (user.id == id)
                return user
        return 1
    }

    getUserByName(username){
        for(let user of this.userMas) {
            if (user.username == username)
                return user
        }
        return 1
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

    deleteBook(id){
        for(let i = 0; i < this.booksMas.length; ++i){
            if(this.booksMas[i].id == id) {
                if(this.booksMas[i].location){
                    console.log('Невозможно удалить книгу - пользователь её не вернул')
                    return
                }
                this.booksMas.splice(i, 1)
                this.updateDataBase()
                return;
            }
        }
        console.log('Данная книга не найдена')
    }

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
            if(this.booksMas[i].id == book.id)
                this.booksMas[i] = book
        this.updateDataBase()
    }

    updateDataBase () {
        fs.writeFileSync('./DataBase.json', JSON.stringify(this))
    }
}

class Book{
    constructor(author, name, date = '01.01.2020', id = db.getStaticMasSize(), location = 0){
        this.author = author
        this.name = name
        this.date = date
        this.id = id
        this.location = location
        if(id == db.getStaticMasSize())
            db.incrementStaticMas()
    }
}

class User{
    constructor(username = 'default', password = 'default', books = [], id = db.getUserCount(), flag = false){
        this.username = username
        if(flag)
            this.password = password
        else
            this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        this.books = books
        this.id = id
    }

    getBook(bookID){
        let db = new DataBase()
        let receivedBook = db.getBookByID(bookID)
        let book = new Book(receivedBook.author, receivedBook.name, receivedBook.date, receivedBook.id, receivedBook.location)

        if(book && !book.location) {
            this.books.push(book)
            book.location = this.id
            db.updateUser(this)
            db.updateBooks(book)
            return 1;
        }
        return 0;
    }

    returnBook(bookID){
        let db = new DataBase()
        for(let i = 0; i < this.books.length; ++i)
            if(this.books[i].id == bookID)
                this.books.splice(i, 1)

        db.updateUser(this)
        let masBooks = db.getBooksMas()
        for(let book of masBooks) {
            if (book.id == bookID) {
                book.location = 0
                console.log(book)
                db.updateBooks(book)
            }
        }
    }

    deleteBook(receivedBook){
        for(let i = 0; i < this.books.length; ++i){
            if(this.books[i].ID == receivedBook.ID)
                this.books.splice(i, 1)
        }
    }
}

function initDataBase(){
    try {
        JSON.parse(fs.readFileSync('./DataBase.json'))
    }
    catch (e) {
        fs.writeFileSync('./DataBase.json', JSON.stringify({currentUserName: '', userMas: [], booksMas: [], staticMas: [1]}))
        db = new DataBase()
        db.addUser(new User('admin', 'admin'))
    }

}

module.exports = {
        initDataBase: initDataBase,
        DataBase: DataBase,
        User: User,
        Book: Book
}

