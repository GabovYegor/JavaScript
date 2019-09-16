const fs = require('fs');

function initDataBase(filename, initData){
    let dataToWrite = JSON.stringify(initData)
    fs.writeFileSync(filename, dataToWrite)
}

function  writeDataToFile(filename, newData) {
    let rawData = fs.readFileSync(filename);
    let parseData = []
    if (rawData.length)
        parseData = JSON.parse(rawData)
    parseData.push(newData)
    let dataToWrite = JSON.stringify(parseData)
    fs.writeFileSync(filename, dataToWrite)
}

function getUsers(filename){
    let rawData = fs.readFileSync(filename);
    let parseData = []
    if (rawData.length)
        parseData = JSON.parse(rawData)
    let usersMas = []
    for(user of parseData) {
        if(user.role === 'user')
            usersMas.push(user)
    }
    return usersMas
}

function getBooks(filename) {
    let rawData = fs.readFileSync(filename);
    let parseData = []
    if (rawData.length)
        parseData = JSON.parse(rawData)
    let Books = []
    for(user of parseData) {
        if(user.role === 'book')
            Books.push(user)
    }
    return Books
}

// не реализованно Админа нет
function getAdmin(filename){
    let rawData = fs.readFileSync(filename);
    let parseData = []
    if (rawData.length)
        parseData = JSON.parse(rawData)
    let admin
    for(user of parseData) {
        if(user.role === 'admin')
            admin = user
    }
    return admin
}

module.exports = {
        writeDataToFile: writeDataToFile,
        initDataBase: initDataBase,
        getUsers: getUsers,
        getBooks: getBooks
}
