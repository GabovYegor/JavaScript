$(document).ready(() => {
    // $('div > *').click(
    //     function () {
    //         console.log($(this).text())
    //         $(this).append('<div id="form">\n' +
    //             '  userName:<br>\n' +
    //             '  <input type="text" placeholder="new userName" id="newUserName"><br>\n' +
    //             '  Amount of money:<br>\n' +
    //             '  <input type="text" placeholder="new amount of money" id="newAmountOfMoney"><br>\n' +
    //             '  <button id="changeUserbtn">change user</button>' +
    //             '  <button id="addUserToAuction">add/remove user to/from auction</button>'
    //         )
    //     })

    $('div > *').click(
        function () {
            if (!$(this).hasClass('selected')) {
                if ($('div > *').hasClass('selected')) {
                    $('div > *').removeClass('selected')
                    $('#form').remove()
                }

                $(this).addClass('selected')
                $(this).append('<div id="form">\n' +
                    '  userName:<br>\n' +
                    '  <input type="text" placeholder="new userName" id="newUserName"><br>\n' +
                    '  Amount of money:<br>\n' +
                    '  <input type="text" placeholder="new amount of money" id="newAmountOfMoney"><br>\n' +
                    '  <button id="changeUserbtn">change user</button>'
                )
            } else {
                $('div > *').removeClass('selected')
                $('#form').remove()
            }
        }
    );

    $(document).on('click', "#changeUserbtn", function() {
        console.log('kekes')
    });
})

