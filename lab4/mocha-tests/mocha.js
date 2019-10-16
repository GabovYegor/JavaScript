const assert = require('chai').assert
const DataBase = require('../backend/DataBase/DataBase')
const User = require('../backend/DataBase/User')

describe("DataBase Test", function () {
    before(() => console.log("all tests start"));
    after(() => console.log("all tests end"));

    var db = new DataBase(false, '../backend/DataBase/DataBaseCurrent.json')
    userMas = db.getUsers()

    it('DataBase Test: getUsers()', function () {
        assert.equal(db.users, db.getUsers())
    });

    it('DataBase Test: getPictures()', function () {
        assert.equal(db.pictures, db.getPictures())
    });

    it('DataBase Test: getUserBySocketId()', function () {
        for (i = 0; i < userMas.length; ++i) {
            userId = userMas[i].socketID
            if (userId != 0)
                assert.equal(userMas[i].userName, db.getUserBySocketId(userId).userName)
        }
    })

    it('DataBase Test: addUserToMas()', function () {
        userMasLengthBefore = userMas.length
        userMas.push(new User())
        assert.equal(userMas.length, userMasLengthBefore + 1)
    });

    it('DataBase Test: registerUser()', function () {
        for (i = 0; i < userMas.length; ++i) {
            db.registerUser(userMas[i], '../backend/DataBase/DataBaseCurrent.json')
            assert.equal(userMas[i].isRegistrated, true)
        }
    });

    it('Data Base: disconectUser()', function () {
        for (i = 0; i < userMas.length; ++i) {
            db.disconnectUser(userMas[i], '../backend/DataBase/DataBaseCurrent.json')
            assert.equal(userMas[i].isRegistrated, false)
            assert.equal(userMas[i].socketID, 0)
        }
    });
})