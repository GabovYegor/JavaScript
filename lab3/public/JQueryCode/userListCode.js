$(document).ready(() => {
    $('li').click(
        function () {
            if (!$(this).hasClass('selected')) {
                if ($('li').hasClass('selected')) {
                    $('li').removeClass('selected')
                    $('#form').remove()
                }

                $(this).addClass('selected')
                $(this).append('<div id="form">\n' +
                    '  userName:<br>\n' +
                    '  <input type="text" placeholder="new userName" id="newUserName"><br>\n' +
                    '  Amount of money:<br>\n' +
                    '  <input type="text" placeholder="new amount of money" id="newAmountOfMoney"><br>\n' +
                    '  <button id="changeUserbtn">change user</button>' +
                    '  <button id="addUserToAuction">add/remove user to/from auction</button>'
                )
            } else {
                $('li').removeClass('selected')
                $('#form').remove()
            }
        }
    );

    $(document).on('click', "#changeUserbtn", function() {
        $.post( "/changeUserAction", {userName: $(this).closest('li').find('#newUserName').val(),
                                      amountOfMoney: $(this).closest('li').find('#newAmountOfMoney').val(),
                                      ID: 3}, changeUser($(this).closest('li').find('#userName'), $(this).closest('li').find('#newUserName').val(),
                                                         $(this).closest('li').find('#amountOfMoney'), $(this).closest('li').find('#newAmountOfMoney').val()), "json" );
    });

    $(document).on('click', "#addUserToAuction", function() {
        $.get("/userActionAuction/" + $(this).closest('li').find('#ID').text(), {}, userActionAuction($(this).closest('li').find('#isInAction')), "json")
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