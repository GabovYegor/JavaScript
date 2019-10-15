const DataBase = require('./DataBase/DataBase')

function userRegistration(req, res) {
    db = new DataBase(false)
    for(user of db.users){
        if(user.userName == req.body.userName && !user.isRegistrated) {
            db.registerUser(user)
            res.render('userPage', {
                userName: user.userName,
                userAmountOfMoney: user.amountOfMoney
            })
        }

        if(user.userName == req.body.userName && user.isRegistrated) {
            res.end('user already registrated !!!')
        }
    }
    res.end('No user with this name !!!')
}

function admin(req, res){
    if(req.body.password == '12345678') {
        db = new DataBase(false)

        for(user of db.users){
            if(user.userName == 'admin' && !user.isRegistrated) {
                db.registerUser(user)
                res.render('adminPage', {
                    users: db.getUsers(),
                    pictures: db.getPictures()
                })
            }
            if(user.userName == 'admin' && user.isRegistrated)
                res.end('user already registrated !!!')
        }
    }
    else
        res.end('Error!!! Wrong password')
}

module.exports = {
    userRegistration: userRegistration,
    admin: admin
}