//      
function startTimer(commonMsg       , endMsg       , time                ) {
    var timerDescriptor                 = setInterval(printTime, 1000)
    function printTime() {
        if (time == 0) {
            clearInterval(timerDescriptor)
            document.getElementById('currentTime').innerText = endMsg
        } else {
            document.getElementById('currentTime').innerText = commonMsg + time--
        }
    }
}

function updateUserAtAdmin(userName       , newMoneyValue       ) {
    let users = $('.userInAdminListInfo')
    for(let i = 0; i < users.length; ++i) {
        if(users[i].innerText.indexOf(userName) !=  -1) {
            users[i].innerText = 'UserName: ' + userName + ' amountOfMoney: ' + newMoneyValue
        }
    }
}

function setUserOnline(userName       ) {
    let users = $('.userInAdminListInfo')
    for(let i = 0; i < users.length; ++i) {
        if(users[i].innerText.indexOf(userName) !=  -1)
            $(users[i]).parent().css('background-color', 'green')
    }
}

function addPictureToUser(picture    ){
    let newPicture = document.createElement('div')
    newPicture.innerText = picture.title
    document.getElementById('purchasedPictureList').appendChild(newPicture)
}

function updatePictureAtAdmin(holder       , pictureTitle       , finalPrice       , flag        ){
    let pictures = $('.pictureHolder')
    for(let i = 0; i < pictures.length; ++i) {
        if(pictures[i].innerText.indexOf(pictureTitle) != -1) {
            if(flag) {
                $(pictures[i]).parent().css('background-color', 'gray')
                pictures[i].innerText = holder + "\n FinalPrice = " + finalPrice
            }
            else {
                pictures[i].innerText = holder
            }
        }
    }
}

$(function () {
    var currentPicture = 0
    var socket = io()
    socket.on('connect', function () {
        addTextToClient('You in chat.', 'addedMessage')
    })

    socket.on('user connected', function (msg       ) {
        addTextToClient(msg + ' connected', 'receivedMessage')
        setUserOnline(msg)
    });

    socket.on('user disconnected', function (msg       ) {
        addTextToClient(msg + ' disconnected', 'receivedMessage')
    });

    socket.on('message', function (msg       ) {
        addTextToClient(msg, 'receivedMessage')
    })

    socket.on('info', function (msg       ) {
        addTextToClient(msg, 'infoMessage')
    })

    socket.on('startTime', function (timeToAuction       ) {
        startTimer('Auction start across: ', 'Auction Start !!!', timeToAuction - 1)
    })

    socket.on('time to watch', function (picture, msg       , timeToWatchPicture       ) {
        startTimer('Bargain start across: ', 'Bargain Start !!!', timeToWatchPicture - 1)
        $('#slider').remove()
        $('#contentSlider').remove()
        $('#upPriceBtn').removeClass('action')
        $('#upPriceBtn').off('click')
        $('#upPriceBtn').click(function () {
            alert('You can trade only in barger time !!!')
        })
        document.getElementById('imagePictureInfo').setAttribute('src', picture.imagePath)
        document.getElementById('authorPictureInfo').innerText = 'Author: ' + picture.author
        document.getElementById('titlePictureInfo').innerText = 'Title: ' + picture.title
        document.getElementById('startPricePictureInfo').innerText = 'Start price: ' + picture.startPrice
        document.getElementById('descriptionPictureInfo').innerText = 'Description: ' + picture.description
        addTextToClient(msg + ' : ' + picture.title, 'infoMessage')
    })

    socket.on('startBargain', function (picture, msg       , timeToBargain       ) {
        currentPicture = picture
        startTimer('auction will last another: ', 'End current bargain !!!', timeToBargain - 1)
        addTextToClient(msg + ' : ' + picture.title, 'infoMessage')
        $('#upPriceBtn').off('click')
        $('#upPriceBtn').click(bargainAction)
    })

    socket.on('resultOfCurrentBargain', function (msg       ) {
        addTextToClient(msg, 'infoMessage')
    })

    socket.on('update money', function (newMoneyValue       , picture    ) {
        document.getElementById('userAmountOfMoneyNum').innerText = newMoneyValue
        addPictureToUser(picture)
    })

    socket.on('updateUserAtAdmin', function (user, newMoneyValue){
        updateUserAtAdmin(user, newMoneyValue)
    })

    socket.on('updatePictureHolder', function (holder, pictureTitle, finalPrice, flag) {
        updatePictureAtAdmin(holder, pictureTitle, finalPrice, flag)
    })

    socket.on('bargain end', function (msg) {
        addTextToClient(msg, 'infoMessage')
        $('#upPriceBtn').off('click')
        $('#upPriceBtn').click(function () {
            alert('You can trade only in bargain time !!!')
        })
    })

    $('#sendBtn').click(function () {
        sendInput = document.getElementById('sendInput')
        mainDiv = document.getElementById('msgField')
        if(document.getElementById('userName'))
            socket.emit('message', document.getElementById('userName').innerText + ': ' + sendInput.value)
        else
            socket.emit('message', ' from admin: ' + sendInput.value)
        addTextToClient(sendInput.value, 'addedMessage')
        sendInput.value = ''
        mainDiv.scrollTop = mainDiv.scrollHeight
    })

    $('#upPriceBtn').click(function () {
        alert('You can trade only in barger time !!!')
    })

    function addTextToClient(msg, classId) {
        newTextLine = document.createElement('div')
        newTextLine.innerText = msg
        newTextLine.id = classId
        document.getElementById('msgField').appendChild(newTextLine)
        mainDiv = document.getElementById('msgField')
        mainDiv.scrollTop = mainDiv.scrollHeight
    }
    $('#msgApp').draggable()
    $('#accordionPictureInfo').accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    })

    $('#purchasedPictureElement').accordion({
        collapsible: true,
        active: false,
        heightStyle: "content"
    })

    function bargainAction() {
        if($(this).hasClass('action')){
            if(Number(document.getElementById('contentSlider').innerText) >= Number(currentPicture.startPrice)) {
                socket.emit('makeBet', socket.id, document.getElementById('contentSlider').innerText)
                addTextToClient('Your bet is: ' + document.getElementById('contentSlider').innerText, 'addedMessage')
            }
            else{
                alert('you dont have such money for buy this picture')
            }
            $('#slider').remove()
            $('#contentSlider').remove()
            $(this).removeClass('action')
        }
        else {
            $(this).addClass('action')
            $(this).after('<div id="slider" style="margin-top: 5px" ></div><span id="contentSlider"></span>')
            max = Number(document.getElementById('userAmountOfMoneyNum').innerText)
            min =  Number(currentPicture.startPrice)
            if(max < Number(currentPicture.startPrice))
                min = 0
            $("#slider").slider({
                value: min,
                min: min,
                max: max,
                step: 10,
                create: function (event, ui) {
                    val = $("#slider").slider("value");
                    $("#contentSlider").html(val);
                },
                slide: function (event, ui) {
                    $("#contentSlider").html(ui.value);

                }
            });
        }
    }
})