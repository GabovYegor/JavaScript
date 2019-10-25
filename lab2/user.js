const passport = require('passport')
const fileWork = require('./workWithDataBase')
const express = require('express')
router = express.Router()

router.get('/', (req, res) => { res.render('authenticationWindow') })
router.get('/profile', passport.authenticationMiddleware(), renderProfile)
router.post('/login', rememberCurrentUser, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))
router.post('/', userRegistration)
router.get('/admin', passport.authenticationMiddleware(), (req, res) => {res.render('adminPage')})
router.post('/admin',  passport.authenticationMiddleware(), admin)
router.get('/bookCard/:id', passport.authenticationMiddleware(), downloadBookCard)
router.get('/take/:id', passport.authenticationMiddleware(), takeBook)
router.get('/returnBook/:id', passport.authenticationMiddleware(), returnBook)
router.get('/changeBookPage/:id', passport.authenticationMiddleware(), changeBookPage)//(req, res) => { res.render('changeBook', {ID: req.params.id}) })
router.post('/changeBookAction', passport.authenticationMiddleware(), changeBook)
router.post('/booksList', passport.authenticationMiddleware(), printBooksListWithFilter)
router.get('/booksList', passport.authenticationMiddleware(), printBooksList)
router.post('/test', test)

// вынести в функцию
router.post('/addBook', passport.authenticationMiddleware(),
    (req, res) => {
        db = new fileWork.DataBase()
        db.addBook(new fileWork.Book(req.body.author, req.body.name))
        res.redirect('/admin')
    })
router.post('/deleteBook', passport.authenticationMiddleware(),
    (req, res) => {
        db = new fileWork.DataBase()
        db.deleteBook(req.body.id)
        res.redirect('/admin')
    })


function admin(req, res) {
    if(req.body.username === 'admin') {
        if(req.body.password === 'admin')
            res.render('adminPage')
        else
            res.redirect('/')
    } else {
        res.redirect('/')
    }
}

function rememberCurrentUser(req, res, next) {
    db = new fileWork.DataBase()
    db.setCurrentUser(req.body.username)
    next()
}

function userRegistration(req, res) {
    db = new fileWork.DataBase()
    db.addUser(new fileWork.User(req.body.username, req.body.password))
    res.render('authenticationWindow')
}

function renderProfile (req, res) {
    let db = new fileWork.DataBase()
    let data = db.getCurrentUser()
    let user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    res.render('userProfile', {
        user: user,
        bookCount: user.books.length
    })
}

function downloadBookCard(req, res){
    let db = new fileWork.DataBase()
    let receivedBook = db.getBookByID(req.params.id)
    let book = new fileWork.Book(receivedBook.author, receivedBook.name, receivedBook.date, receivedBook.id, receivedBook.location)
    db.updateBooks(book)
    res.render('bookCard', {
        book: book,
        userId: db.getCurrentUser().id,
        userName: db.getUserByID(book.location).username,
        bookID: req.params.id
    })
}

function printBooksList(req, res){
    let db = new fileWork.DataBase()
    let books = db.getBooksMas()
    res.render('booksList', {
        books: books,
        db: db
    })
}

function printBooksListWithFilter(req, res){
    let db = new fileWork.DataBase()
    let receivedBooks = db.getBooksMas()
    let books = []
    switch (req.body.select) {
        case 'onHand':
            for(let i = 0; i < receivedBooks.length; ++i){
                if(receivedBooks[i].location === 0){
                    books.push(receivedBooks[i])
                }
            }
            break

        case 'all':
            books = receivedBooks
            break

        case 'date':
            books = receivedBooks
            books.sort(function (a, b) {
                return a.date > b.date
            })
            break
        default:
            console.log('printBooksListWithFilter fail')
    }

    res.render('booksList', {
        books: books,
        db: db
    })
}

function takeBook(req, res){
    let data = db.getCurrentUser()
    let user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    user.getBook(req.params.id)
    res.redirect('/booksList')
}

function returnBook(req, res){
    let data = db.getCurrentUser()
    let user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    user.returnBook(req.params.id)
    res.redirect('/profile')
}

function changeBookPage(req, res) {
    let db = new fileWork.DataBase()
    let book = db.getBookByID(req.params.id)
    res.render('changeBook', {
        ID: req.params.id,
        defaultName: book.name,
        defaultAuthor: book.author,
        defaultDate: book.date,
        defaultLocation: db.getUserByID(book.location).username
    })
}

function changeBook(req, res){
    db = new fileWork.DataBase()
    let oldBook = db.getBookByID(req.body.ID)
    let oldData = db.getUserByID(oldBook.location)
    data = db.getUserByName(req.body.newLocation)
    if(data == 1) {
        console.log('No such user. Upgrates are canceled')
        res.redirect('/booksList')
        return
    }
    user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    oldUser = new fileWork.User(oldData.username, oldBook.password, oldData.books, oldBook.id, true)
    oldUser.deleteBook(oldBook)
    let book = new fileWork.Book(req.body.newAuthor, req.body.newName, req.body.newDate, req.body.ID, user.id)
    db.updateBooks(book)
    user.books.push(book)
    db.updateUser(user)
    res.redirect('/booksList')
}

function test(req, res){
    console.log('test function')
    console.log(req.body.form)
    res.sendStatus(200)
}

module.exports = router
