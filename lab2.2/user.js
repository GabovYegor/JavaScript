const passport = require('passport')
const fileWork = require('./workWithDataBase')

// добавить роутер вместо инициализации app
function initUser (app) {
    app.get('/', (req, res) => { res.render('authenticationWindow') })
    app.get('/profile', passport.authenticationMiddleware(), renderProfile)
    app.post('/login', rememberCurrentUser, passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }))
    app.post('/', userRegistration)
    app.get('/admin', passport.authenticationMiddleware(), (req, res) => {res.render('adminPage')})
    app.post('/admin',  passport.authenticationMiddleware(), admin)
    app.get('/bookCard/:id', passport.authenticationMiddleware(), downloadBookCard)
    app.get('/take/:id', passport.authenticationMiddleware(), takeBook)
    app.get('/returnBook/:id', passport.authenticationMiddleware(), returnBook)
    app.get('/changeBookPage/:id', passport.authenticationMiddleware(), (req, res) => { res.render('changeBook', {ID: req.params.id}) })
    app.post('/changeBookAction', passport.authenticationMiddleware(), changeBook)
    app.get('/booksList', passport.authenticationMiddleware(), printBooksList)
    app.post('/addBook', passport.authenticationMiddleware(),
        (req, res) => {
            db = new fileWork.DataBase()
            db.addBook(new fileWork.Book(req.body.author, req.body.name))
            res.redirect('/admin')
        })
    app.post('/deleteBook', passport.authenticationMiddleware(),
        (req, res) => {
            db = new fileWork.DataBase()
            db.deleteBook(req.body.id)
            res.redirect('/admin')
    })
}

function admin(req, res) {
    console.log('hello')
    if(req.body.username === 'admin') {
        if(req.body.password === 'admin')
            res.render('adminPage')
        else
            res.redirect('/')
    } else {
        res.redirect('/')
    }
}

// Запомнить текущего пользователя
function rememberCurrentUser(req, res, next) {
    db = new fileWork.DataBase()
    db.setCurrentUser(req.body.username)
    next()
}

// Здесь зарегать пользователя
function userRegistration(req, res) {
    db = new fileWork.DataBase()
    db.addUser(new fileWork.User(req.body.username, req.body.password))
    res.render('authenticationWindow')
}

function renderProfile (req, res) {
    db = new fileWork.DataBase()
    data = db.getCurrentUser()
    user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    res.render('userProfile', {
        user: user
    })
}

function downloadBookCard(req, res){
    let db = new fileWork.DataBase()
    let receivedBook = db.getBookByID(req.params.id)
    let book = new fileWork.Book(receivedBook.author, receivedBook.name, receivedBook.id, receivedBook.location)
    db.updateBooks(book)
    res.render('bookCard', {
        book: book,
        userId: db.getCurrentUser().id,
        bookID: req.params.id
    })
}

function printBooksList(req, res){
    db = new fileWork.DataBase()
    books = db.getBooksMas()
    res.render('booksList', {
        books: books
    })
}

function takeBook(req, res){
    data = db.getCurrentUser()
    user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    user.getBook(req.params.id)
    res.redirect('/booksList')
}

function returnBook(req, res){
    data = db.getCurrentUser()
    user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    db.updateUser(user)
    user.returnBook(req.params.id)
    res.redirect('/booksList')
}

function changeBook(req, res){
    db = new fileWork.DataBase()
    let oldBook = db.getBookByID(req.body.ID)
    let oldData = db.getUserByID(oldBook.location)
    oldUser = new fileWork.User(oldData.username, oldBook.password, oldData.books, oldBook.id, true)
    oldUser.deleteBook(oldBook)
    let book = new fileWork.Book(req.body.newAuthor, req.body.newName, req.body.ID, req.body.newLocation)
    db.updateBooks(book)
    data = db.getUserByID(req.body.newLocation)
    user = new fileWork.User(data.username, data.password, data.books, data.id, true)
    user.books.push(book)
    db.updateUser(user)
    res.redirect('/booksList')
}

module.exports = {
    initUser: initUser
}