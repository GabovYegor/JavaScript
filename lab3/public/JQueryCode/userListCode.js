$(document).ready(() => {
    $('li').click(
        function () {
            if (!$(this).hasClass('selected')) {
                if ($('li').hasClass('selected')) {
                    $('li').removeClass('selected')
                    $('#changeForm').remove()
                }

                $(this).addClass('selected')
                $(this).append('<div id="changeForm">\n' +
                    '  <input type="text" placeholder="new userName" id="newUserName"><br>\n' +
                    '  <input type="text" placeholder="new amount of money" id="newAmountOfMoney"><br>\n' +
                    '  <button id="changeUserBtn">change user</button>' +
                    '  <button id="removeUserBtn">remove user</button>' +
                    '  <button id="addUserToAuction">add/remove user to/from auction</button>' +
                    '  </div> '
                )
            }
        }
    );

    $(document).on('click', "#changeUserBtn", function() {
        $.post( "/changeUserAction", {userName: $(this).closest('li').find('#newUserName').val(),
                                      amountOfMoney: $(this).closest('li').find('#newAmountOfMoney').val(),
                                      ID: $(this).closest('li').find('#ID').text()}, changeUser($(this).closest('li').find('#userName'), $(this).closest('li').find('#newUserName').val(),
                                                         $(this).closest('li').find('#amountOfMoney'), $(this).closest('li').find('#newAmountOfMoney').val()), "json" );
    });

    $(document).on('click', "#addUserToAuction", function() {
        $.get("/userActionAuction/" + $(this).closest('li').find('#ID').text(), {}, userActionAuction($(this).closest('li').find('#isInAction')), "json")
    })


    $(document).on('click', '#addUserBtn', function () {
        if($(this).hasClass('addActive')){
            $(this).text('show add user form')
            $('#addForm').remove()
            $(this).removeClass('addActive')
        }else{
            $(this).addClass('addActive')
            $(this).text('hide add user form')
            $(this).after('<div id="addForm">\n' +
            '  <input type="text" placeholder="UserName" id="addUserName"><br>\n' +
            '  <input type="text" placeholder="Amount of money" id="addAmountOfMoney"><br>\n' +
            '  <button id="addUserFormBtn">Add user</button>' +
            '  </div> ')
        }
    })

    $(document).on('click', '#addUserFormBtn', function () {
        $.ajaxSetup({async:false});
        var response = $.post( "/addUserAction", {userName: $('#addUserName').val(), amountOfMoney: $('#addAmountOfMoney').val()}, ()=>{}, "json");
        $('ol').append('<li>ID:' + response.responseText + '<br>Name:'
            + $('#addUserName').val() + '<br>amount of money:' + $('#addAmountOfMoney').val() + '<br>Take part in auction? false</li>')
    })

    $(document).on('click', '#removeUserBtn', function () {
        $.post( "/removeUserAction", {id: $(this).parent().parent().find('#ID').text()}, ()=>{}, "json");
        $(this).parent().parent().remove()
    })


    function changeUser(user, newUser, amountOfMoney, newAmountOfMoney){
        user.text(newUser)
        amountOfMoney.text(newAmountOfMoney)
    }

    function userActionAuction(isInAction) {
        if(isInAction.text() == 'true')
            isInAction.text('false')
        else
            isInAction.text('true')
    }
})
