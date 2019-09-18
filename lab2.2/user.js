const passport = require('passport')
const fileWork = require('./workWithDataBase')

// добавить роутер вместо инициализации app
// хранить у пользователя только id книги
// не забывать аутентифицироваться при переходе по страницам
// у админа не проверяется идентификация

function initUser (app) {
    app.get('/', (req, res) => { res.render('authenticationWindow') })
    app.get('/profile', passport.authenticationMiddleware(), renderProfile)
    app.post('/login', rememberCurrentUser, passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }))
    app.post('/', userRegistration)
    app.get('/admin', (req, res) => {res.redirect('/')})
    app.post('/admin',  passport.authenticationMiddleware(), admin)
    app.get('/bookCard/:id', passport.authenticationMiddleware(), downloadBookCard)
    app.get('/take/:id', passport.authenticationMiddleware(), takeBook)
    app.get('/booksList', passport.authenticationMiddleware(), printBooksList)
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
    if(user.id === 1) {
        if (!user.getBook(1))
            console.log('This book empty')
    }

    if(user.id === 2) {
        if (!user.getBook(3))
            console.log('This book empty')
    }

    res.render('userProfile', {
        user: user
    })
}

function downloadBookCard(req, res){
    db = new fileWork.DataBase()
    console.log(req.params.id)
    let receivedBook = db.getBookByID(req.params.id)
    console.log(receivedBook)
    let book = new fileWork.Book(receivedBook.author, receivedBook.name, receivedBook.id, receivedBook.location)
    db.updateBooks(book)

    res.render('bookCard', {
        book: book,
        user: db.getCurrentUser(),
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

module.exports = {
    initUser: initUser
}