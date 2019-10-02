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
                    '  <button id="button">change user</button>'+
                '</div>'
                )
            }
        }
    );

    $(document).on('click', "#button", function() {
        $.post( "/changeUserAction", {userName: $(this).closest('li').find('#newUserName').val(),
                                      amountOfMoney: $(this).closest('li').find('#newAmountOfMoney').val(),
                                      ID: 3}, changeUser($(this).closest('li').find('#userName'), $(this).closest('li').find('#newUserName').val(),
                                                         $(this).closest('li').find('#amountOfMoney'), $(this).closest('li').find('#newAmountOfMoney').val()), "json" );
    });

    function changeUser(user, newUser, amountOfMoney, newAmountOfMoney){
        user.text(newUser)
        amountOfMoney.text(newAmountOfMoney)
    }
})