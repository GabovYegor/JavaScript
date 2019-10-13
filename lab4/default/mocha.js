// run with mocha 'file name'

const assert = require('assert')

function fun(){
    return 1
}

describe("fun", function () {
    before(() => console.log("Тестирование началось – перед тестами"));
    after(() => console.log("Тестирование закончилось – после всех тестов"));
    beforeEach(() => console.log("Перед тестом – начинаем выполнять тест"));
    afterEach(() => console.log("После теста – заканчиваем выполнение теста"));

    it('my test', function () {
        assert.equal(1, fun())
    });
})